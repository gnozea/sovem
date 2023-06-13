<?php

namespace App\Http\Controllers;

use App\Models\ProviderSpeciality;
use App\Models\ServiceSpeciality;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class SpecialityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param Speciality $speciality
     * @return string[]
     */
    public function store(Request $request, Speciality $speciality)
    {
        $request->validate([
            "name" => "required|string",
            "service_id" => "required|exists:services,id",
            "providers.*" => "sometimes|exists:providers,id"
        ]);
        //1. add speciality
        $speciality = Speciality::create([
            "name" => $request->get("name"),
        ]);

        //2. link service in service_specialities
        ServiceSpeciality::create([
            "service_id" => $request->get("service_id"),
            "speciality_id" => $speciality['id']
        ]);


        //3. link providers in provider_specialities
        $data = [];
        foreach ($request->get("providers") as $item){
            $data[] = ["provider_id" => $item, "speciality_id" => $speciality['id']];
        }
        $speciality->provider_specialities()->createMany($data);

        return [
            "status" => "success",
            "data" => []
        ];
    }

    public function add_from_service(Request $request)
    {
        $request->validate([
            "new" => "sometimes|between:0,1",
            "name" => "string|required_with:new",
            "specialist.*" => "sometimes|exists:specialities,id",
            "providers.*" => "required|exists:providers,id",
            "service_id" => "required|exists:services,id"
        ]);


        //1.0 Create new speciality
        $specialist = [];
        if ($request->has("new") && $request->get("new") == "1"):
            $specialist[] = Speciality::create(["name" => $request->get("name")])->toArray()['id'];
        else: //1.1 or get those selected by user
            $specialist = $request->get("specialist");
        endif;

        //2. Add service_specialities
        $service_specialities = [];
        $provider_specialities = [];
        foreach ($specialist as $item){
            $service_specialities[] = ["service_id" => $request->get("service_id"), "speciality_id" => $item, "created_at" => Carbon::now()];

            if ($request->has("providers") && count($request->get("providers"))) foreach ($request->get("providers") as $provider){
                $provider_specialities[] = ["speciality_id" => $item, "provider_id" => $provider, "created_at" => Carbon::now()];
            }
        }

        //Save service_specialities data
        $ss = ServiceSpeciality::insert($service_specialities);

        //3. Add provider_specialities
        if ($request->has("providers") && count($request->get("providers"))) ProviderSpeciality::insert($provider_specialities);

        return [
            "status" => "success"
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Speciality  $specialist
     * @return \Illuminate\Http\Response
     */
    public function show(Speciality $specialist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Speciality  $specialist
     * @return \Illuminate\Http\Response
     */
    public function edit(Speciality $specialist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Speciality  $specialist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Speciality $specialist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Speciality  $specialist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Speciality $specialist)
    {
        //
    }
}
