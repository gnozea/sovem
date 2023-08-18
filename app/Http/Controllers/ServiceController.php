<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Provider;
use App\Models\ProviderService;
use App\Models\RequestLog;
use App\Models\Service;
use App\Models\ServiceRequest;
use App\Models\ServiceSpeciality;
use App\Models\Speciality;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        $services = Service::withCount(['providers'])
            ->with(["specialists"])->get();
        return [
            'status' => 'success',
            'data' => $services
        ];
    }

    public function services()
    {
        return [
            'status' => 'success',
            'data' => Service::all()
        ];
    }

    public function start_form()
    {
        return [
            'status' => 'success',
            'data' => Service::all()
        ];
    }

    public function service_speciality(Request $request)
    {
        $services = DB::table("service_specialities", "ss")
            ->join("specialities as s", "s.id", "=", "ss.speciality_id")
            ->whereIn("ss.service_id", $request->get('selections'))
            ->where("ss.deleted_at", null)
            ->get(['name', "speciality_id as id"]);
        return [
            'status' => 'success',
            'data' => $services
        ];
    }

    public function dept()
    {
        return Department::get(['id', "name"]);
    }

    public function search_city(Request $request)
    {
        if (!$request->get('q')) return [];

        if ($request->has("dept")) $cities = Department::with(["cities" => function ($query) use ($request) {
            return $query->where("name", "LIKE", "%{$request->get('q')}%");
        }])->where("id", $request->get("dept"))->get();

        if ($request->has("all")) $cities = Department::with(["cities" => function ($query) use ($request) {
            return $query->where("name", "LIKE", "%{$request->get('q')}%");
        }])->get();

        if (!$request->has("all") && !$request->has("dept")) $cities = Department::with(["cities" => function ($query) use ($request) {
            return $query->where("name", "LIKE", "%{$request->get('q')}%");
        }])->where("status", "open")->get();

        $all = [];
        if ($request->has("all")){
            foreach (array_merge(array_filter($cities->pluck('cities')->toArray())) as $array){
                foreach ($array as $item) {
                    $all[] = $item;
                }
            }
        }

        return [
            'status' => 'success',
            'data' => !$request->has("all") ? $cities->pluck('cities')[0] : $all
        ];
    }

    public function track($trackId)
    {
        $request = \App\Models\Request::where("ticket_number", $trackId)
            ->with([
                "logs"  => function ($query) {
                    return $query->with(["service", "provider", 'specialist'])
                        ->where("decision", "accepted")
                        ->orWhere("decision", null)
                        ->orderBy("created_at", "DESC")->orderBy("id", "DESC");
                }
            ])->first();

        if (!isset($request['logs'])) return response([
            "status" => "error",
            "msg" => "Nimero demand sa a pa egziste."
        ], 422);

        $toGroup = $request['logs']->groupBy("speciality_id");
        unset($request['logs']);

        $service = array_values($toGroup->toArray());
        $confirmed = [];

        foreach ($service as $key => $value){
            if (count($value) === 1 && $value[0]['decision'] === "accepted"){
                $confirmed[] = $value;
                unset($service[$key]);
            }
        }
        $service = array_values($service);

        return [
            "status" => "success",
            "data" => [
                'services' => $service,
                'request' => $request,
                "confirmed" => $confirmed
            ]
        ];
    }

    public function confirm_preference(Request $request)
    {
        $data = json_decode($request->get('confirm'));
        $update = null;
        foreach ($data as $datum){
            $update = ServiceRequest::where("service_id", $datum->{"service_id"})
            ->where("speciality_id", $datum->{"speciality_id"})
            ->where("request_id", $datum->{"request_id"})
            ->update(["provider_id" => $datum->{'provider_id'}, "status" => "claimed"]);

            $update = RequestLog::where("service_id", $datum->{"service_id"})
            ->where("speciality_id", $datum->{"speciality_id"})
            ->where("request_id", $datum->{"request_id"})
            ->where("provider_id", $datum->{'provider_id'})
            ->update(["decision" => "accepted"]);

            $update = RequestLog::where("service_id", $datum->{"service_id"})
            ->where("speciality_id", $datum->{"speciality_id"})
            ->where("request_id", $datum->{"request_id"})
            ->where("provider_id", "<>", $datum->{'provider_id'})
            ->update(["decision" => "rejected"]);
        }
        return [
            'status' => 'success'
        ];
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
     * @return array
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "providers.*" => "sometimes|exists:providers,id"
        ]);
        $service = Service::create([
            "name" => $request->get("name"),
            "added_by" => Auth::id()
        ]);

        $providers = [];
        if ($request->has("providers")){
            foreach ($request->get("providers") as $item){
                $providers[] = ["provider_id" => $item];
            }

            $providers = $service->providers()->createMany($providers);
        }

        return [
            "status" => "success",
            "data" => $service
        ];
    }

    public function link_provider(Request $request, ProviderService $providerService)
    {
        $request->validate([
            "service_id" => "required|exists:services,id",
            "providers.*" => "required|exists:providers,id"
        ]);

        $provider_db = $providerService
            ->where("service_id", $request->get("service_id"))
            ->whereIn("provider_id", $request->get("providers"))
            ->get("provider_id")->toArray();
        $merge = array_values(call_user_func_array("array_merge_recursive", $provider_db));
        $provider_db = isset($merge[0]) && is_array($merge[0]) ? $merge[0] : $merge;

        $providerRequest = $request->get("providers");


        if (count($provider_db)) foreach ($provider_db as $have){
            $key = array_search($have, $providerRequest);
            if (false !== $key) {
                if (isset($providerRequest[$key])) unset($providerRequest[$key]);
            }
        }

        $providers = [];
        foreach ($providerRequest as $item){
            $providers[] = ["provider_id" => $item, "service_id" => $request->get("service_id"), "created_at" => Carbon::now()];
        }

        $ignored = count($request->get('providers')) - count($providerRequest);
        $status = "success";

        if (count($providerRequest) == 0) {
            $msg = "Ces prestataires ont déjà été lié.";
            $status = "error";
        }elseif (count($providerRequest) < 0 && count($providerRequest) < $request->get('specialists')) {
            $msg = "Prestataire(s) lié(s) avec succès.";
        }elseif (count($providerRequest) > 0 && count($providerRequest) < $request->get('specialists')) {
            $msg = "$ignored élement" . ($ignored > 1 ? 's' :'') . " ignoré" . ($ignored > 1 ? 's' :'') . " pour duplication.";
        }else{
            $msg = "Vous avez lié " . count($providerRequest) . " prestataire" . (count($providerRequest) > 1 ? "s" : '') . ".";
        }

        $ps = null;
        if ($status == "success") $ps = $providerService->insert($providers);
        if ($ps) return [
            "status" => $status,
            "msg" => $msg
        ];
        return [
            "status" => "error",
            "msg" => $msg
        ];
    }

    public function search_specialist($term, Request $request)
    {
        $specialist = Speciality::where("name", "LIKE", "%{$request->get('q')}%")
            ->with(["service_specialities"])->get();

        return [
            "status" => "success",
            "data" => $specialist
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        //
    }
}
