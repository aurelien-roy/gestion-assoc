<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActivityRequest extends FormRequest
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
            'name'  =>  'string|max:100',
            'period'    =>  'digits:4',
            'color' =>  'string|size:7|regex:/^#[0-9a-f]{6}$/',
            'level' =>  'string|max:150',
            'teacher'   =>  'string|max:100',
            'maxParticipants'   =>  'integer|min:1'
        ];
    }
}
