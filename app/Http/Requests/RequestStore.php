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
            "gender" => "required|string",
            "incidentDate" => "required|date_format:Y-m-d|before_or_equal:today",
            "serviceId.*" => "required|exists:services,id",
            "violenceType" => "required",
            "incidentLocation" => "sometimes|nullable|string",
            "city.id" => "required|exists:cities,id",
            "city.department_id" => "required|exists:departments,id",
            "crimeCity.id" => "required|exists:cities,id",
            "crimeCity.department_id" => "required|exists:departments,id",
            "specialistId.*" => "required|exists:specialities,id",
            "violenceType.*" => "required|in:" . implode(",", ["Vyolans seksyel", "Vyolans Fizik", "Deplasman fòse"]),
            "felon.*" => "required|in:" . implode(",", ["Yon patenè", "Yon manm fanmi", "Yon otorite", "Yon enkoni"]),
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
