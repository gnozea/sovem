<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Request as Demand;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(Request $request)
    {
        $dateType = $request->get("dateType") == "di" ? "incident_date" : "created_at";

        $report = Demand::whereBetween("incident_date", $request->get("date"));

//        $report->with(["incident_city_location" => function ($query) use ($request) {
//            if ($request->has("location") && $request->get("location") != "-1") return $query->where("id", $request->get("location"));
//            return $query;
//        }]);
//        $report->with(["incident_dept_location" => function ($query) use ($request) {
//            if ($request->has("dept") && $request->get("dept") != "-1") return $query->where("id", $request->get("dept"));
//            return $query;
//        }]);

        if (Auth::user()["provider_id"]){
            $report->join("request_claimed as rc", function ($join){
                $join->on('requests.id', '=', 'rc.request_id')
                    ->where("rc.provider_id", Auth::user()['provider_id']);
            });
        }

        if ($request->has("location") && $request->get("location") != "-1") $report->where("incident_city", $request->get("location"));
        if ($request->has("dept") && $request->get("dept") != "-1") $report->where("incident_department", $request->get("dept"));

        $report->whereHas("incident_dept_location");
        $report->whereHas("incident_dept_location");
        $keyBy = "period";
        if ($request->has("groupBy")){
            if ($request->has("groupBy") && $request->get("groupBy") == "di") {
                $keyBy= "period";
                $report->selectRaw("count(requests.id) as total, DATE_FORMAT(requests.incident_date, '%d/%m/%Y') as period")
                ->groupBy('period');
            }
            if ($request->has("groupBy") && $request->get("groupBy") == "ds") {
                $keyBy= "period";
                $report->selectRaw("count(requests.id) as total, DATE_FORMAT(requests.created_at, '%d/%m/%Y') as period")
                ->groupBy('period');
            }
            if ($request->has("groupBy") && $request->get("groupBy") == "gender") {
                $keyBy= "period";

                $report->selectRaw('
                    DATE_FORMAT(incident_date, "%d/%m/%Y") as period,
                    COUNT(CASE WHEN gender = "Fi" THEN 1 ELSE NULL END) as "male",
                    COUNT(CASE WHEN gender = "Gason" THEN 1 ELSE NULL END) as "female"
                ')->groupBy('period');
                //, COUNT(*) as "all"
            }
        }

        $report = $report->get()->keyBy($keyBy);

        //if ($request->has("groupBy")) $report;
        return [
            "status" => "success",
            "data" => $report
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
