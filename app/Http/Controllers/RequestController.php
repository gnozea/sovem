<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestStore;
use App\Models\ProviderSpeciality;
use App\Models\Request as Demand;
use App\Models\RequestClaimed;
use App\Models\RequestLog;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Ramsey\Uuid\Uuid;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function index(Request $request)
    {
        $provider = \request()->has('provider_id') && (\request()->get('provider_id') != null || \request()->get('provider_id') != 'null') ? $request->get("provider_id") : null;

        $claim_word = ($provider) ? 'claimed' : "unclaimed";


        $req = Demand::with(["service_type", "speciality_type"])
            ->with([
                "claimed" => function($query) use ($request, $provider)
                {
                    if ($provider) return $query->where("provider_id", $provider)->with("specialities");
                    return $query->with("specialities");
                },
                "requests" => function($query) use ($request, $claim_word, $provider)
                {
                    if ($provider) return $query->where("status", $claim_word)
                        ->where("provider_id", $provider)
                        ->with("specialities", "provider");
                    return $query->with(["specialities", "provider"]);
                },
//                "logs" => function($query) use ($provider){
//                    if ($provider) return $query->where("provider_id", $provider)->where("decision", "accepted");
//                    return $query->where("decision", "accepted");
//                }
            ])
            ->has("requests")
//            ->whereHas("claimed")
            ->simplePaginate(15);

        foreach ($req as $key => $item){
            if (!is_array($req[$key]['violence_type'])) $req[$key]["violence_type"] = json_decode($req[$key]['violence_type']);
        }

        return [
            "status" => "success",
            $req
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
     * @param Request $request
     * @return string[]
     */
    public function store(RequestStore $request)
    {
        $uuid = Uuid::uuid1();
        $spec = $this->specialists($request->get("specialistId")); //Where provider is active
        $recipients = [];
        foreach ($spec as $item){
            if ($item->providers) $recipients[] = $item->providers['email'];
        }

        $spec["violence_type"] = $request->get('violenceType');
        $spec["uuid"] = $uuid;

        foreach ($recipients as $recipient) {
            Mail::to($recipient)->send(new \App\Mail\Request($spec));
        }

        $latestRequest = Demand::orderBy('created_at','DESC')->first();
        $hex = hexdec(substr(uniqid(), 0, 5) . "" . ($latestRequest ? (int)$latestRequest['id'] : 0));
        $demand = Demand::create([
            "uuid" =>  $uuid,
            "ticket_number" => $hex,
            "age_range" => $request->get("ageRange"),
            "gender" => $request->get("gender"),
            "your_city" => $request->get("city")['id'],
            "incident_location" => $request->get("incidentLocation"),
            "incident_date" => $request->get("incidentDate"),
            "violence_type" => json_encode($request->get("violenceType")),
            "felon" => $request->get("felon")[0]
        ]);

        if ($demand){
            $requests = [];
            foreach ($request->get("specialistId") as $value){
                $requests[] = [
                    "service_id" => $request->get("serviceId")[0],
                    "speciality_id" => $value,
                    "request_id" => $demand
                ];
            }
            $demand->requests()->createMany($requests);
        }
        return [
            "status" => "success",
            "data" => [
                "ticket_number" => $demand['ticket_number'],
                "date" => $demand['created_at']
            ]
        ];
    }


    /**
     * @param array $specialityId
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    private function specialists(array $specialityId = []) {
        return ProviderSpeciality::with(["providers" => function($query){
            return $query->where("status", "active");
        }, "speciality"])->whereIn("speciality_id", $specialityId)->get();
    }

    public function release(Request $request)
    {
        $request->validate([
            "*.provider_id" => "required|exists:providers,id",
            "*.request_id" => "required|exists:requests,id",
            "*.service_id" => "required|exists:services,id",
            "*.speciality_id" => "required|exists:specialities,id",
        ]);

        $where = [];
        foreach ($request->all() as $key => $value){

            $where["service_id"][] = [$value["service_id"]];
            $where["request_id"][] = [$value["request_id"]];
            $where["provider_id"][] = [$value["provider_id"]];
            $where["speciality_id"][] = [$value["speciality_id"]];
        }

        $demand = ServiceRequest::whereIn("service_id", $where['service_id'])
            ->whereIn("request_id", $where['request_id'])
            ->whereIn("provider_id", $where['provider_id'])
            ->whereIn("speciality_id", $where['speciality_id'])
            ->where("status", "claimed")
            ->update(["status" => "released", "provider_id" => null, "claim_amount" => DB::raw('claim_amount - 1')]);

        if ($demand) RequestLog::whereIn("service_id", $where['service_id'])
            ->whereIn("request_id", $where['request_id'])
            ->whereIn("provider_id", $where['provider_id'])
            ->whereIn("speciality_id", $where['speciality_id'])
            ->where("decision", "accepted")
            ->update(["decision" => null]);

        return [
            "status" => "success",
            "released" => $demand
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param string $uuid
     * @param Demand $demand
     * @return array
     */
    public function show(string $uuid, Demand $demand)
    {
        $req = $demand->where('uuid', $uuid)
            ->with("city")->first();
        $service = ServiceRequest::with("specialities")
            ->where("request_id", $req['id'])
            ->where(function ($query) {
                return $query->where("status", "<>", "claimed")
                    ->where("status", "<>", "solved");
            })->get();

        if ($service && !is_array($req['violence_type'])) $req['violence_type'] = json_decode($req['violence_type']);
        return [
            "status" => "success",
            "data" => [
                'service' => $service,
                'request' => $req
            ]
        ];
    }

    public function accept($id, Request $request, ServiceRequest $serviceRequest)
    {
        $request->request->add(['provider_id', Auth::user()["provider_id"]]);
        $request->validate([
            //"request_id" => "required|exists:requests,id",
            "sR.*" => "required|exists:service_requests,id",
            "date" => 'required|date_format:Y-m-d',
            "time" => 'required|string',
            "provider_id" => 'required|exists:users,id',
        ]);

        $alreadyClaimed = RequestClaimed::where("provider_id", Auth::user()['provider_id'])
            ->whereIn("service_request_id", $request->get("sR"))->get(['service_request_id'])->toArray();

        $alreadyClaimed = array_column($alreadyClaimed, "service_request_id");

        $free = $request->get("sR");

        foreach ($free as $key => $value){
            if (in_array($value, $alreadyClaimed)) unset($free[$key]);
        }

        if (!count($free)) return [
            "status" => "error",
            "msg" => "Vous avez déjà réclamé toutes les demandes."
        ];

        //Add code if one of services was previously claimed and trying to claim alongside of another.

        $found = $get = $serviceRequest->where("request_id", $id)
            ->whereIn("id", $free)
            ->where("status", "<>", "claimed")
            ->where("claim_amount", "<", 3)
            ->where("status", "<>", "solved");
        if (!$get->get()) return [
            "status" => 'error',
            "data" =>
                [
                    "updated" => $found
                ]
        ];

        //First of all update service request status table row
        $updating = $found->increment("claim_amount", 1);//update(["claim_amount" => DB::raw("claim_amount + 1")]); //Both work

        $logs = [];

        if ($updating) {
            $data = [];
            foreach ($found->get() as $item) {
                $data[] = [
                    "request_id" => $id,
                    "service_request_id" => $item['id'],
                    "provider_id" => Auth::user()["provider_id"],
                    "speciality_id" => $item['speciality_id'],
                    "service_id" => $item['service_id'],
                    "date_slot" => $request->get("date"),
                    "time_slot" => $request->get("time")
                ];
                $logs[] = [
                    "api_log" => ' ',//"Gen yon founisè ki aksepte dosye w la.",
                    "provider_id" => Auth::user()["provider_id"],
                    "request_id" => $id,
                    "service_request_id" => $item['id'],
                    "speciality_id" => $item['speciality_id'],
                    "service_id" => $item['service_id'],
                    "date_slot" => $request->get("date"),
                    "time_slot" => $request->get("time")
                ];
            }

            //Add claim history to request_claimed table
            $history = RequestClaimed::insert($data);

            //Create log
            RequestLog::insert($logs);
        }

        //TODO Email provider to ask them to rate and update the service status
        return [
            "status" => "success",
            "data" =>
                [
                    "updated" => $found,
                    "affected" => $updating
                ]
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Demand  $demand
     * @return \Illuminate\Http\Response
     */
    public function edit(Demand $demand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  Demand  $demand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Demand $demand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Demand  $demand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Demand $demand)
    {
        //
    }
}
