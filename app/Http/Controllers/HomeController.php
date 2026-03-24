<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\MatchOldPassword;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    /**
     * @param $filter
     * @return \Illuminate\Support\Collection
     * Done
     */
    function providerChart($filter): \Illuminate\Support\Collection
    {
        return DB::table('requests')
            ->selectRaw("count(id) as total, date_format($filter, '%b %Y') as period")
            ->whereYear($filter, '>=', date("Y"))
            ->groupBy('period')
            ->whereIn("id", function ($query) {
                return $query->select('request_id')->from("request_claimed")->where("provider_id", Auth::user()['provider_id']);
            })
            ->get()
            ->keyBy('period');
    }

    /**
     * @param Request $request
     * @return array
     * Done
     */
    public function chart(Request $request)
    {
        $filter = $request->has('filter') ? $request->get('filter') : "created_at";
        if (Auth::user()['provider_id']) {
            $users = $this->providerChart($filter);
        }else {
            $users = DB::table('requests')
                ->selectRaw("count(id) as total, date_format($filter, '%b %Y') as period")
                ->whereYear($filter, '>=', date("Y"))
                ->groupBy('period')
                ->get()
                ->keyBy('period');
        }

        $periods = collect([]);
        foreach (CarbonPeriod::create('first day of January ' . date('Y'), '1 month', now()/*->subMonth()*/) as $period) {
            $periods->push($period->format('M Y'));
        }

        $totals = $periods->map(function ($period) use ($users) {
            return $users->get($period)->total ?? 0;
        });

        //print_r($this->request_by_dept($filter));

        return [
            'status' => 'success',
            'totals' => $totals->toArray(),
            'periods' => $periods->toArray()
        ];
    }

    private function providerStateStats($filter, Request $request)
    {
        return DB::table("requests", "req")
            ->select("dept.name", DB::raw('count(req.id) as total'))
            ->join("departments as dept", "dept.id", "=", "incident_department")
            ->join("request_claimed as rc", function ($join){
                $join->on('req.id', '=', 'rc.request_id')
                    ->where("rc.provider_id", Auth::user()['provider_id']);
            })
            ->whereMonth($filter, '>=', date("m"))
            ->groupBy('dept.name')
            ->get()
            ->keyBy('name');
    }

    public function stateStats(Request $request)
    {
        $filter = $request->has('filter') ? $request->get('filter') : "incident_date";
        $filter = "req." . $filter;
        if (Auth::user()['provider_id']) $query = $this->providerStateStats($filter, $request);
        if (!Auth::user()['provider_id']) $query = DB::table("requests", "req")
            ->selectRaw("count(req.id) as total, dept.name")
            ->leftJoin("departments as dept", "dept.id", "=", "incident_department")
            ->whereMonth($filter, '>=', date("m"))
            ->groupBy('dept.name')
            ->get()
            ->keyBy('name');

        return [
            "status" => "success",
            "data" => $query
        ];
    }

    /**
     * @param $filter
     * @param Request $request
     * @return \Illuminate\Support\Collection
     * Done
     */
    private function providerStatsAge($filter, Request $request)
    {
        return DB::table("requests", "req")
            ->select("age_range AS age", DB::raw('count(req.id) as total'))
            ->whereMonth($filter, '>=', date("m"))
            ->join("request_claimed as rc", function ($join){
                $join->on('req.id', '=', 'rc.request_id')
                    ->where("rc.provider_id", Auth::user()['provider_id']);
            })
            ->groupBy('age')
            ->get()
            ->keyBy('age');
    }

    /**
     * @param Request $request
     * @return array
     * Done
     */
    public function statsAge(Request $request)
    {
        $filter = $request->has('filter') ? $request->get('filter') : "incident_date";
        $filter = "req." . $filter;

        if (Auth::user()['provider_id']) $query = $this->providerStatsAge($filter, $request);

        if (!Auth::user()['provider_id']) $query = DB::table("requests", "req")
            ->selectRaw("count(req.id) as total, age_range AS age")
            ->whereMonth($filter, '>=', date("m"))
            ->groupBy('age')
            ->get()
            ->keyBy('age');

        return [
            "status" => "success",
            "data" => $query
        ];
    }

    public function request_by_dept($filter): \Illuminate\Support\Collection
    {
        return DB::table('requests')
            ->selectRaw("count(id) as total, date_format($filter, '%b %Y') as period, gender")
            ->whereYear($filter, '>=', date("Y"))
            ->groupBy(['gender', "period"])
            ->get()
            ->keyBy('period');
    }

    public function change_password(Request $request)
    {
        $request->validate([
            'old' => 'required',
            'new' => ['required'],
            'confirm' => ['same:new'],
        ]);
        if (!Hash::check($request->get("old"), Auth::user()["password"])){
            return response(["message" => "Ancien mot de passe est incorrect."], 422);
        }

        User::find(Auth::id())->update(["password" => Hash::make($request->get("new"))]);
        return [
            "status" => "success",
            "message" => "Votre mot de passe a été modifié."
        ];
    }
}
