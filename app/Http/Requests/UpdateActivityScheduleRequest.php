<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActivityScheduleRequest extends FormRequest
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
            'day'   =>  'in:lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche',
            'start' =>  'date_format:H:i',
            'end' =>  'date_format:H:i',
        ];
    }
}
