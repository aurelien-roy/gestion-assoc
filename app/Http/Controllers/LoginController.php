<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;

class LoginController extends Controller
{
    public function login(ServerRequestInterface $request)
    {
        $oauth = [
            "grant_type"    =>  "password",
            "client_id" =>  env('PASSPORT_CLIENT_ID'),
            "client_secret" =>  env('PASSPORT_CLIENT_SECRET'),
            "scope" =>  "*"
        ];
        $parameters = array_merge($oauth, $request->getParsedBody());
        $request = $request->withParsedBody($parameters);
        return app('\Laravel\Passport\Http\Controllers\AccessTokenController')->issueToken($request);
    }
}
