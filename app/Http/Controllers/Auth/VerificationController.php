<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Cache;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use PragmaRX\Google2FA\Google2FA;

class VerificationController extends Controller
{
    private $cache = null;

    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws InvalidCharactersException
     * @throws SecretKeyTooShortException
     */
    public function verify_2fa_code(Request $request): array
    {
        $request->validate([
            "code" => "required|string",
            "email" => "sometimes|exists:users,email"
        ]);

        $user = User::where("email", $request->get("email"))->first();

        $secret = $request->has("email") ? $user["google2fa_secret"] : Auth::user()['google2fa_secret'];
        $google2fa = new Google2FA();
        $window = 8;
        print_r(strlen($secret));
        $isValid = $google2fa->verifyKeyNewer($request->get("code"), $secret, $window);
        if ($isValid) return [
            "status" => "success",
            "msg" => "Code is valid"
        ];
        return  [
            "status" => "error",
            "msg" => "Code is not valid"
        ];
    }

    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws SecretKeyTooShortException
     * @throws InvalidCharactersException
     */
    public function post_login_otp(Request $request): array
    {
        $status = $this->verify_2fa_code($request);
        $user = Auth::id();
        $accountId = Auth::id();
        if ($status['status'] === "success") {
            Cache::set("$user-mfa", true);
            Cache::set("user-$accountId-mfa", Auth::user()['google2fa_secret']);
        }
        return $status;
    }

    public function enrollMFA(Request $request)
    {
        $user = Auth::id();
        if ($request->has("regenerate") && $request->get("regenerate")) Cache::delete("$user-mfaEnroll");
        $mfa = new Google2FA();
        try {
            $secretKey = !Cache::has("$user-mfaEnroll") ? $mfa->generateSecretKey(32) : Cache::get("$user-mfaEnroll");
            if (!Cache::has("$user-mfaEnroll")) Cache::set("$user-mfaEnroll", $secretKey);
            $qr_code = $mfa->getQRCodeUrl(
                \env("APP_ENV") != "local" ? \env("APP_NAME") : \env("APP_NAME_LOCAL"),
                Auth::user()["email"],
                $secretKey
            );
        } catch (IncompatibleWithGoogleAuthenticatorException | InvalidCharactersException | SecretKeyTooShortException $e) {
            return \response()->json([
                "status" => "error",
                "msg" => "Unable to initialize Google authenticator."
            ]);
        }
        GetQRCode:
        return \response()->json([
            "status" => "success",
            "data" => $qr_code
        ]);
    }

    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws SecretKeyTooShortException
     * @throws InvalidCharactersException
     */
    public function enrollMFASave(Request $request)
    {
        if (!$request->has("fingerprint")) return response([
            "msg" => "We could not identify your browser",
            "type" => "browser"
        ], 422);

        $google2fa = new Google2FA();
        $user = Auth::id();
        $accountId = Auth::id();
        //print_r(Cache::get("$user-mfaEnroll"));
        $isValid = $google2fa->verifyKey(Cache::get("$user-mfaEnroll"), $request->get("code"));

        if ($isValid) {
            User::find(Auth::id())->update(["google2fa_secret" => Cache::get("$user-mfaEnroll")]);
            Cache::set("$user-mfa", true);
            Cache::set("user-$accountId-mfa", Cache::get("$user-mfaEnroll"));

            Cache::delete("$user-mfaEnroll");
            Cache::delete("user-$accountId-mfa");
            return response([
                "msg" => "Redirection en cours.",
                "status" => "success"
            ]);
        }
        return response([
            "msg" => "Ce code n'est pas valide."
        ], 422);
    }
}
