<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;


class StoreActivityRequest extends FormRequest
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
            'name'  =>  $this->requiredOnPost() . 'string|max:100',
            'period'    =>  $this->requiredOnPost() . 'digits:4',
            'color' =>  $this->requiredOnPost() . 'string|size:7|regex:/^#[0-9a-f]{6}$/',
            'level' =>  'nullable|string|max:100',
            'place' => 'nullable|string|max:100',
            'teacher'   =>  'nullable|string|max:100',
            'maxParticipants'   =>  'integer|min:1',
            'schedules' => 'array',
            'schedules.*.day' => 'required|integer|between:1,7',
            'schedules.*.start' => 'required|date_format:G:i',
            'schedules.*.end' => 'required|date_format:G:i'

        ];
    }

    public function requiredOnPost(){
        return Request::method() === 'POST' ? 'required|' : '';
    }
}
