<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\VerificationController;
use App\Mail\ProviderActivation;
use App\Mail\ProviderCreation;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use PHPUnit\Exception;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use PragmaRX\Google2FA\Google2FA;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        $provider = Provider::simplePaginate(15)->toArray();
        $provider["status"] = "success";
        return $provider;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function search(Request $request)
    {
        if (!$request->get('q')) return [];

        $providers = Provider::where("status", "active")
            ->where("name", "LIKE", "%{$request->get('q')}%")
            ->orWhere("name_short", "LIKE", "%{$request->get('q')}%");
        if ($request->has('names')){
            $names = json_decode($request->get('names'));
            foreach ($names as $name){
                $providers->where("name", "NOT LIKE", "%{$name}%");
            }
        }
        return [
            'status' => 'success',
            'data' => $providers->get()
        ];
    }

    public function change_address($id, Request $request){
        $request->validate([
            "address_line_1" => "required|string",
            "city" => "required|exists:cities,id"
        ]);
        $provider = Provider::find($id);
        $provider->update([
            'address_line_1' => $request->get("address_line_1"),
            'city' => $request->get("city"),
        ]);
        return [
            "status" => "success",
            "msg" => "Vos données ont été mis à jours.",
            "update" => $provider
        ];
    }

    public function resend_verification(Request $request)
    {
        $request->validate([
            "user" => "required|exists:users,id"
        ]);
        $token = User::find($request->get("user"));
        $spec["email_verification_token"] = $token->email_verification_token;

        try {
            Mail::to($token->email)->send(new ProviderCreation($spec));
        }catch (\Swift_TransportException $exception){}
        return [
            "status" => "success",
            "msg" => "Email de vérification a été envoyé."
        ];
    }

    /**
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function initAccount($token): \Illuminate\Http\JsonResponse
    {
        $check = User::where("email_verification_token", $token)
            ->with("provider")
            ->whereHas("provider")
            ->first();
        if (!$check) \response()->json([
            "status" => "error",
            "message" => "No account was found."
        ]);

        $google2fa = new Google2FA();
        try {
            $secretKey = $google2fa->generateSecretKey();
            $check->update(["google2fa_secret" => encrypt($secretKey)]);
            $qr_code = $google2fa->getQRCodeUrl(
                \env("APP_NAME"),
                $check["email"],
                $secretKey
            );
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $e) {
            return \response()->json([
                "status" => "error",
                "msg" => "Unable to initialize Google authenticator."
            ]);
        }
        $check['qrCode'] = $qr_code;
        return \response()->json([
            "status" => "success",
            "data" => $check
        ]);
    }

    public function initAccountStore($token, Request $request)
    {
        $check = User::where("email_verification_token", $token)
            ->where("provider_id", $request->get("provider"))
            ->first();
        if (!$check) return \response()->json([
            "status" => "error",
            "message" => "Account was not found."
        ]);
        $check->update([
            "name" => $request->get("name"),
            "password" => Hash::make($request->get("password")),
            'status' => "active",
            "email_verification_token" => null,
            "email_verified_at" => Carbon::now()
        ]);

        Provider::find($request->get("provider"))->update(['status' => "active"]);

        $check->save();

        Auth::login($check, true);

        return \response([
            "status" => "success",
            "data" => $check
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "name_short" => "required|string",
            "email" => "required|string",
            "phone" => "required|string",
            "address_line_1" => "required|string",
            "city" => "required|exists:cities,id"
        ]);

        if ($request->file()) {
            $logo = $request->file('logoFile');
            $path = 'uploads/providers';
            $name = uniqid() . '.' . $logo->getClientOriginalExtension();
            $logo->storeAs('public/' . $path, $name);
        }
        $request->request->remove('logoFile');
        if ($request->file()) $request->request->add(['logo' => $path . '/' . $name]);

        $userEmail = $request->get("email");

        if ($request->has("notification-email")) $request->merge(["email" => $request->get('notification-email')]);
        $save = Provider::create($request->all());

        $token = Str::random(32);
        $spec["email_verification_token"] = $token;

        User::create([
            "email" => $userEmail,
            "email_verification_token" => $token,
            'provider_id' => $save['id'],
            'password' => Hash::make(Str::random(15)),
        ]);

        try {
            Mail::to($request->get('email'))->send(new ProviderCreation($spec));
        }catch (\Swift_TransportException $exception){}

        $save['status'] = "pending";

        return [
            "status" => "success",
            "created" => $save
        ];
    }

    public function add_specialist($id, Request $request)
    {
        $request->validate([
            "specialists.*" => "required|exists:specialities,id"
        ]);

        $specialistsRequest = $request->get('specialists');

        //First check if provider already have those specialities
        $pr = Provider::with(['provider_specialities' => function($query) use ($specialistsRequest){
            return $query->whereIn("speciality_id", $specialistsRequest);
        }])->where("id", $id)->get();

        $alreadyHave = $pr->pluck("provider_specialities")->toArray()[0];

        foreach ($alreadyHave as $have){
            $key = array_search($have["speciality_id"], $specialistsRequest);
            if (false !== $key) {
                if (isset($specialistsRequest[$key])) unset($specialistsRequest[$key]);
            }
        }

        $specialists = [];
        foreach ($specialistsRequest as $specialist){
            $specialists[] = [
              "speciality_id" => $specialist
            ];
        }

        $provider = Provider::find($id);
        $numberText = count($specialists) == 1 ? "une" : count($specialists);

        $ignored = count($request->get('specialists')) - count($specialistsRequest);
        $status = "success";
        if (count($specialistsRequest) == 0) {
            $msg = "Ces services ont déjà été ajoutés.";
            $status = "error";
        }elseif (count($specialistsRequest) < 0 && count($specialistsRequest) < $request->get('specialists')) {
            $msg = "Spécialité(s) ajoutée(s) avec succès.";
        }elseif (count($specialistsRequest) > 0 && count($specialistsRequest) < $request->get('specialists')) {
            $msg = "$ignored élement" . ($ignored > 1 ? 's' :'') . " ignoré" . ($ignored > 1 ? 's' :'') . " pour duplication.";
        }else{
            $msg = "Vous avez ajouté " . count($specialistsRequest) . " spécalité" . (count($specialistsRequest) > 1 ? "s" : '') . ".";
        }

        $create = null;
        if ($status == "success") {
            $create = $provider->provider_specialities()->createMany($specialists);
            try {
                $spec = [
                    "subject" => "Spécialité ajouté à votre compte",
                    "title" => "Vous avez " . $numberText . " nouvelle spécialité" . (count($specialists) > 1 ? "s" : ""),
                    "button_url" => Env::get("APP_URL") . "/dashboard",
                    "button_text" => "Aller au tableau de bord",
                    "message" => "Un administrateur vient d'ajouter " . count($specialists) . " spécialité" . (count($specialists) > 1 ? "s" : "") . " à votre compte sur " . \env("APP_URL") . ". Desormais vous recevrez des demandes de service. "
                ];
                Mail::to($provider['email'])->send(new ProviderActivation($spec));
            } catch (\Swift_TransportException $exception) {}
        }

        if ($create) return [
            "status" => $status,
            "msg" => $msg
        ];
        return [
            "status" => "error",
            "msg" => $msg
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function show(Provider $provider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function edit(Provider $provider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $id
     * @param Request $request
     * @param Provider $provider
     * @return string[]
     */
    public function update($id, Request $request, Provider $provider)
    {
        $request->validate([
            "name" => "required|string",
            "email" => "required|string",
            "phone" => "required|string",
            "name_short" => "required|string"
        ]);
        $find = $provider->find($id);

        $find->update($request->all());
        $find->save();
        return [
            "status" => "success",
            "update" => $find
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array
     */
    public function destroy($id)
    {
        $provider = Provider::find($id);

        if (!$provider) return response(["status" => "error", "msg" => "Prestataire introuvable."], 404);

        // Remove linked users, specialities and services before deleting the provider
        User::where("provider_id", $id)->delete();
        $provider->provider_specialities()->delete();
        $provider->services()->delete();
        $provider->delete();

        return ["status" => "success", "msg" => "Prestataire supprimé."];
    }

    /**
     * Disable the specified resource from storage.
     *
     * @param $id
     * @param Provider $provider
     * @return string[]
     */
    public function disable($id, Provider $provider)
    {
        $item = $provider->find($id);
        $item->status = "inactive";
        $item->save();
        return [
          "status" => "success"
        ];
    }

    /**
     * Disable the specified resource from storage.
     *
     * @param $id
     * @param Provider $provider
     * @return string[]
     */
    public function activate($id, Provider $provider)
    {
        $item = $provider->find($id);
        $item->status = "active";
        $item->save();
        $spec = [
            "subject" => "Votre compte est activé",
            "title" => "Votre compte est activé!",
            "button_url" => Env::get("APP_URL") . "/dashboard",
            "button_text" => "Aller au tableau de bord",
            "message" => "Un admin vient d'activer votre compte. Vous pouvez maintenant accéder au tableau de bord et commencer à accepter des demandes de services."
        ];
        try {
            Mail::to($item['email'])->send(new ProviderActivation($spec));
        }catch (\Swift_TransportException $exception){

        }
        return [
          "status" => "success"
        ];
    }
}
