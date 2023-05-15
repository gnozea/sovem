<?php

namespace App\Http\Controllers;

use App\Mail\ProviderActivation;
use App\Mail\ProviderCreation;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

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
            "email_verification_token" => null,
            "email_verified_at" => Carbon::now()
        ]);

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

        $save = Provider::create($request->all());

        $token = Str::random(32);
        $spec["email_verification_token"] = $token;

        User::create([
            "email" => $request->get('email'),
            "email_verification_token" => $token,
            'provider_id' => $save['id'],
            'password' => \Illuminate\Support\Facades\Hash::make(Str::random(15)),
        ]);

        Mail::to($request->get('email'))->send(new ProviderCreation($spec));

        $save['status'] = "pending";

        return [
            "status" => "success",
            "created" => $save
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
     * @param  \App\Models\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Provider $provider)
    {
        //
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
            "button_url" => \Illuminate\Support\Env::get("APP_URL") . "/dashboard",
            "button_text" => "Aller au tableau de bord",
            "message" => "Un admin vient d'activer votre compte. Vous pouvez maintenant accéder au tableau de bord et commencer à accepter des demandes de services."
        ];
        Mail::to($item['email'])->send(new ProviderActivation($spec));
        return [
          "status" => "success"
        ];
    }
}
