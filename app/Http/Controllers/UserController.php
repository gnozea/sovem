<?php

namespace App\Http\Controllers;

use App\Mail\ProviderActivation;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with("provider");

        if (Auth::user()['provider_id']) $users->where("provider_id", Auth::user()['provider_id']);

        return response([
            "status" => "success",
            "data" => $users->get()
        ]);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
           "email" => "required|string|unique:users,email"
        ]);
        User::create([
            "name" => $request->get("name"),
            "email" => $request->get("email"),
            "password" => Hash::make(Str::random(10))
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

//        try {
//            $spec = [
//                "subject" => "Nouveau compte crée",
//                "title" => "Un nouveau compte vous a été crée",
//                "button_url" => Env::get("APP_URL") . "/dashboard",
//                "button_text" => "Aller au tableau de bord",
//                "message" => "Un nouveau compte a été créé pour vous par votre administrateur sur le portail konektem. Suivez ce lien pour créer un nouveau mot de passe pour accéder au compte."
//            ];
//            Mail::to($request->get("email"))->send(new ProviderActivation($spec));
//        } catch (\Swift_TransportException $exception) {}

        return response([
           'status' => 'success',
           'msg' => "Utilisateur ajouté."
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
