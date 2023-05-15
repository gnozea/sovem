<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            "ageRange" => "required|string",
            "your_city" => "required|exists:cities,id",
            "felon.*" => "required",
            "gender" => "required|string",
            "incidentLocation" => "required|string",
            "incidentDate" => "required|date_format:Y-m-d|before_or_equal:today",
            "serviceId.*" => "required|exists:services,id",
            "specialistId.*" => "required",
            "violenceType" => "required",
        ];
    }

    function prepareForValidation()
    {
        if ($this->has('city') && $this->city != 'undefined') {
            $this->merge(["your_city" => $this->get("city")['id']]);
            //$this->request->remove("city");
        }
    }
}
