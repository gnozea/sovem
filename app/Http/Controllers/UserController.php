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

//        $users->where("id", "<>", Auth::user()['id']);

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
        //Max user is 3
        $request->validate([
            "name" => "required|string",
           "email" => "required|string|unique:users,email"
        ]);

        $data = [
            "name" => $request->get("name"),
            "email" => $request->get("email"),
            "password" => Hash::make(Str::random(10))
        ];

        //Check how many users has provider on file
        if ($request->has("provider")){
            $users = User::where("provider_id", $request->get("provider"))->get();

            if ($users->count() >= 3) return response(["status" => "error", "msg" => "Vous avez atteint le maximun de 3 utilisateurs par compte"], 422);
            $data["provider_id"] = $request->get("provider");
        }

        User::create($data);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return response([
           'status' => 'success',
           'msg' => "Utilisateur ajouté, un email a été envoyé à " . $request->get("email")
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
