<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use PragmaRX\Google2FA\Google2FA;

class VerificationController extends Controller
{
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
        $secret = $request->has("email") ? (User::where("email", $request->get("email"))->first())["google2fa_secret"] : Auth::user()['google2fa_secret'];

        $google2fa = new Google2FA();
        $isValid = $google2fa->verify($request->get("code"), decrypt($secret));
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
        $user = $request->get("fingerprint");
        $accountId = Auth::id();
        if($status['status'] === "success") {
            apcu_store("$user-mfa", true);
            apcu_store("user-$accountId-mfa", Auth::user()['google2fa_secret']);
        }
        return $status;
    }

    public function enrollMFA(Request $request)
    {
        $user = $request->get("fingerprint");
        if ($request->has("regenerate") && $request->get("regenerate")) apcu_delete("$user-mfaEnroll");
        $mfa = new Google2FA();
        try {
            $secretKey = !apcu_exists("$user-mfaEnroll") ? $mfa->generateSecretKey() : decrypt(apcu_fetch("$user-mfaEnroll"));
            if (!apcu_exists("$user-mfaEnroll")) apcu_store("$user-mfaEnroll", encrypt($secretKey));
            $qr_code = $mfa->getQRCodeUrl(
                \env("APP_ENV") != "local" ? \env("APP_NAME") : \env("APP_NAME_LOCAL"),
                Auth::user()["email"],
                $secretKey
            );
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $e) {
            return \response()->json([
                "status" => "error",
                "msg" => "Unable to initialize Google authenticator."
            ]);
        }
        GetQRCode: return \response()->json([
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
        $user = $request->get("fingerprint");
        $accountId = Auth::id();

        $isValid = $google2fa->verify($request->get("code"), decrypt(apcu_fetch("$user-mfaEnroll")));

        if ($isValid) {
            User::find(Auth::id())->update(["google2fa_secret" => apcu_fetch("$user-mfaEnroll")]);
            apcu_store("$user-mfa", true);
            apcu_store("user-$accountId-mfa", encrypt(apcu_fetch("$user-mfaEnroll")));

            apcu_delete("$user-mfaEnroll");
            apcu_delete("user-$accountId-mfa");
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
