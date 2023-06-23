<?php

use App\Http\Controllers\ProviderController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SpecialityController;
use App\Http\Middleware\AccountType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

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

Route::view('/{path?}', 'layouts.app')->where('path','^(?!api|auth|uploads).*$');;

Auth::routes();
Route::get('.well-known/pki-validation/{file}', function (){
    $file = "B8B9FF6FF29AA92FC0AF414DB4262150.txt";
    $file= public_path() . "/$file";

    $headers = [
        'Content-Type' => 'application/txt',
    ];

     return response()->download($file, "$file", $headers);
});

Route::prefix("api")->group(function (){
    Route::get("account/check", function (){
        $account = Auth::check() ? Auth::user() : [];
        $provider = $account && $account['provider_id'] ? \App\Models\Provider::where("id", $account["provider_id"])->first() : null;
        if ($account) $account['provider'] = $provider;
        return $account;
    });

    Route::get("provider/init/{token}", [ProviderController::class, "initAccount"]); //Get pre-created provider account
    Route::post("provider/init/{token}", [ProviderController::class, "initAccountStore"]); //Get pre-created provider account

    Route::get("track/{trackId}", [ServiceController::class, "track"]);

    Route::post("track/confirm", [ServiceController::class, "confirm_preference"]);

    Route::get("services", [ServiceController::class, "services"]);

    Route::post("request", [RequestController::class, "store"]);

    Route::get("city/search", [ServiceController::class, "search_city"]);

    Route::get("service/specialities", [ServiceController::class, "service_speciality"]);

    Route::post("start-form", [ServiceController::class, "start_form"]);

    Route::prefix("dashboard")->middleware(["auth"])->group(function (){
        Route::post('change-password', [\App\Http\Controllers\HomeController::class, "change_password"]);
        Route::get("requests", [RequestController::class, "index"]);
        Route::get("charts", [\App\Http\Controllers\HomeController::class, "chart"]);

        Route::post("request/release", [RequestController::class, "release"]);
        Route::get("request/{uuid}", [RequestController::class, "show"]);
        Route::post("request/{uuid}", [RequestController::class, "accept"]);

        Route::get("checkByEmail", function (Request $request){
            $check = User::where("email", $request->get('email'))->first();
            if ($check) return [
                "status" => "error",
                "message" => "Email already exists!"
            ];
        });
        Route::get("providers", [ProviderController::class, "index"])->middleware(AccountType::class);
        Route::post("provider/{id}/disable", [ProviderController::class, "disable"])->middleware(AccountType::class);
        Route::post("provider/{id}/activate", [ProviderController::class, "activate"])->middleware(AccountType::class);
        Route::put("provider/{id}", [ProviderController::class, "update"])->middleware(AccountType::class);
        Route::post("provider", [ProviderController::class, "store"])->middleware(AccountType::class);
        Route::post("provider/{id}/add-specialist", [ProviderController::class, "add_specialist"])->middleware(AccountType::class);
        Route::get("provider/search", [ProviderController::class, "search"])->middleware(AccountType::class);

        Route::get("services", [ServiceController::class, "index"])->middleware(AccountType::class);
        Route::post("service", [ServiceController::class, "store"])->middleware(AccountType::class);
        Route::post("service/link-provider", [ServiceController::class, "link_provider"])->middleware(AccountType::class);
        Route::get("service/{id}/search_specialist", [ServiceController::class, "search_specialist"])->middleware(AccountType::class);

        Route::get("specialist", [ServiceController::class, "index"])->middleware(AccountType::class);
        Route::post("specialist", [SpecialityController::class, "store"])->middleware(AccountType::class);
        Route::post("specialist/add_from_service", [SpecialityController::class, "add_from_service"])->middleware(AccountType::class);
    });
});



/************************ ROUTE FOR ALL DOMAIN RELATED UPLOADS ****************************/
Route::get('uploads/{params?}', function ($filename)
{
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
