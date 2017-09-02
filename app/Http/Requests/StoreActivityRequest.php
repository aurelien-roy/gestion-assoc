<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'name'  =>  'required|string|max:100',
            'period'    =>  'required|digits:4',
            'color' =>  'required|string|size:7|regex:/^#[0-9a-f]{6}$/',
            'level' =>  'required|string|max:150',
            'teacher'   =>  'required|string|max:100',
            'maxParticipants'   =>  'required|integer|min:1'
        ];
    }
}
