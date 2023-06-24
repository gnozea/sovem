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
            'totals' => $totals->toArray(),
            'periods' => $periods->toArray()
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
