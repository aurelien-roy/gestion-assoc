<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'first_name'    =>  'required|max:100',
            'last_name'    =>  'required|max:100',
            'email' =>  'required|email|unique:users|max:255',
            'password'  =>  'required|min:8',
            'organization_id'   =>  'required'
        ];
    }
}
