<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequestLogRequest;
use App\Http\Requests\UpdateRequestLogRequest;
use App\Models\RequestLog;

class RequestLogController extends Controller
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
     * @param  \App\Http\Requests\StoreRequestLogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequestLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RequestLog  $requestLog
     * @return \Illuminate\Http\Response
     */
    public function show(RequestLog $requestLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RequestLog  $requestLog
     * @return \Illuminate\Http\Response
     */
    public function edit(RequestLog $requestLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRequestLogRequest  $request
     * @param  \App\Models\RequestLog  $requestLog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequestLogRequest $request, RequestLog $requestLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RequestLog  $requestLog
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequestLog $requestLog)
    {
        //
    }
}
