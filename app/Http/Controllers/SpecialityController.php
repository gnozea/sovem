<?php

namespace App\Http\Controllers;

use App\Models\ServiceSpeciality;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
