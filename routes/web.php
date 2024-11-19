<?php

use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AccountType;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::view('/{path?}', 'layouts.app')->where('path', '^(?!api|auth|uploads).*$');;

Auth::routes();
Route::get('.well-known/pki-validation/{file}', function () {
    $file = "B8B9FF6FF29AA92FC0AF414DB4262150.txt";
    $file = public_path() . "/$file";

    $headers = [
        'Content-Type' => 'application/txt',
    ];

    return response()->download($file, "$file", $headers);
});

Route::prefix("api")->group(function () {
    Route::get("account/check", function (Request $request) {
        $cache = app("Phpfastcache");
        $user = Auth::id();
        $account = Auth::check() ? Auth::user() : [];
        if (Auth::check()) $account["mfaCapable"] = Auth::user()['google2fa_secret'] != null;
        if (Auth::check()) $account['mfa'] = $cache->get("$user-mfa");
        if (Auth::check() && Auth::user()['google2fa_secret'] != null) {
            $accountId = Auth::id();
            $cache->set("user-$accountId-mfa", Auth::user()['google2fa_secret']);
        }
        $provider = $account && $account['provider_id'] ? \App\Models\Provider::where("id", $account["provider_id"])->first() : null;
        if ($account) $account['provider'] = $provider;
        return $account;
    });

    Route::post("login/reset-password", function (Request $request) {
        $request->validate(['email' => 'required|email|exists:users,email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? ['status' => __($status)]
            : ['email' => __($status)];
    });

    Route::post("reset-password", function (Request $request) {
        $email = urldecode($request->get("email"));
        $request->merge(["email" => $email]);
        $request->merge(["password_confirmation" => $request->get("password")]);
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET ? \response(['status' => "success", "data" => __($status)]) : \response(['email' => [__($status)]], 422);
    });

    Route::get("reset-password", function (Request $request) {
        $email = urldecode($request->get("email"));
        $request->merge(["email" => $email]);
        $request->validate(['email' => 'required|email|exists:users,email']);

        return [
            "status" => "success"
        ];
    });

    Route::post("authenticator/verify", [VerificationController::class, "verify_2fa_code"]);
    Route::get("authenticator/enrollment", [VerificationController::class, "enrollMFA"]);
    Route::post("authenticator/enrollment", [VerificationController::class, "enrollMFASave"]);
    Route::post("post-login/otp", [VerificationController::class, "post_login_otp"]);

    Route::get("provider/init/{token}", [ProviderController::class, "initAccount"]); //Get pre-created provider account
    Route::post("provider/init/{token}", [ProviderController::class, "initAccountStore"]); //Get pre-created provider account

    Route::get("track/{trackId}", [ServiceController::class, "track"]);

    Route::post("track/confirm", [ServiceController::class, "confirm_preference"]);

    Route::get("services", [ServiceController::class, "services"]);

    Route::post("request", [RequestController::class, "store"]);

    Route::get("city/search", [ServiceController::class, "search_city"]);

    Route::get("service/specialities", [ServiceController::class, "service_speciality"]);

    Route::post("start-form", [ServiceController::class, "start_form"]);

    Route::prefix("dashboard")->middleware(["auth", /*'verify2fa'*/])->group(function () {

        Route::get("users", [UserController::class, "index"]);
        Route::post("users", [UserController::class, "store"]);

        Route::post("reset-mfa", function (Request $request) {
            $cache = app("Phpfastcache");
            if (!$request->has("id") && !Auth::id()) \response(["msg" => "Something went wrong."], 422);
            $id = $request->has("id") ? $request->get("id") : Auth::id();
            $user = User::find($id);
            if (!$user['google2fa_secret']) return \response(["msg" => "Ce compte n'a pas de MFA actif."], 422);
            $user['google2fa_secret'] = null;
            $user->save();
            $fingerprint = Auth::id();
            $cache->delete("$fingerprint-mfa");
            $cache->delete("user-$id-mfa");

            $data = [
                "refresh" => false,
                "msg" => "Le MFA a été reinitialisé."
            ];

            if (($request->has("id") && $request->get('id') === Auth::id()) || !$request->has('id')) {
                Auth::logout();

                $request->session()->invalidate();

                $request->session()->regenerateToken();

                Auth::loginUsingId($id);

                $data['refresh'] = true;
                $data['msg'] = "Votre MFA a été réinitialisé";
            }
            return \response($data);
        });

        Route::post("reset-password", function (Request $request) {
            $request->validate(['email' => 'required|email|exists:users,email']);
            $status = Password::sendResetLink(
                $request->only('email')
            );

            return $status === Password::RESET_LINK_SENT
                ? ['status' => __($status)]
                : ['email' => __($status)];
        });

        Route::get("dept", [ServiceController::class, "dept"]);

        Route::post("resend-verification", [ProviderController::class, "resend_verification"]);

        Route::get('reports', [\App\Http\Controllers\ReportController::class, "index"]);

        Route::post('change-password', [HomeController::class, "change_password"]);
        Route::get("requests", [RequestController::class, "index"]);
        Route::get("charts", [HomeController::class, "chart"]);
        Route::get("state-charts", [HomeController::class, "stateStats"]);
        Route::get("charts-age", [HomeController::class, "statsAge"]);

        Route::post("request/release", [RequestController::class, "release"]);
        Route::get("request/{uuid}", [RequestController::class, "show"]);
        Route::post("request/{uuid}", [RequestController::class, "accept"]);

        Route::get("checkByEmail", function (Request $request) {
            $check = User::where("email", $request->get('email'))->first();
            if ($check) return [
                "status" => "error",
                "data" => $check,
                "message" => "Email already exists!"
            ];
        });
        Route::get("providers", [ProviderController::class, "index"])->middleware(AccountType::class);
        Route::post("provider/{id}/disable", [ProviderController::class, "disable"])->middleware(AccountType::class);
        Route::put("provider/{id}/change-address", [ProviderController::class, "change_address"])->middleware(AccountType::class);
        Route::post("provider/{id}/activate", [ProviderController::class, "activate"])->middleware(AccountType::class);
        Route::put("provider/{id}", [ProviderController::class, "update"])->middleware(AccountType::class);
        Route::post("provider", [ProviderController::class, "store"])->middleware(AccountType::class);
        Route::post("provider/{id}/add-specialist", [ProviderController::class, "add_specialist"])->middleware(AccountType::class);
        Route::get("provider/search", [ProviderController::class, "search"])->middleware(AccountType::class);

        Route::get("services", [ServiceController::class, "index"])->middleware(AccountType::class);
        Route::post("service", [ServiceController::class, "store"])->middleware(AccountType::class);
        Route::post("service/link-provider", [ServiceController::class, "link_provider"])->middleware(AccountType::class);
        Route::get("service/{id}/search_specialist", [ServiceController::class, "search_specialist"])->middleware(AccountType::class);

        Route::get("specialists", [SpecialityController::class, "index"])->middleware(AccountType::class);
        Route::get("specialist", [ServiceController::class, "index"])->middleware(AccountType::class);
        Route::post("specialist", [SpecialityController::class, "store"])->middleware(AccountType::class);
        Route::post("specialist/add_from_service", [SpecialityController::class, "add_from_service"])->middleware(AccountType::class);
    });
});



/************************ ROUTE FOR ALL DOMAIN RELATED UPLOADS ****************************/
Route::get('uploads/{params?}', function ($filename) {
    define('DS', DIRECTORY_SEPARATOR);

    $path = storage_path() . DS .  'app' . DS . 'public' . DS . 'uploads' . DS . $filename;
    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
})->name('storage.uploads')->where('params', '(.*)');
