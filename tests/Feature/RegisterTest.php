<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterTest extends TestCase
{
    const FIRST_NAME = 'Test first name';
    const LAST_NAME = 'Test last name';
    const EMAIL = 'email@test.app';
    const PASSWORD = 'testtest';
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRegister()
    {
        $response = $this->json('POST', '/api/register', [
            'first_name'    =>  self::FIRST_NAME,
            'last_name'    =>  self::LAST_NAME,
            'email'    =>  self::EMAIL,
            'password'  =>  self::PASSWORD,
        ]);

        $response
            ->assertStatus(200);
    }

    public function testRegiteredUserIsSaved()
    {
        $savedUser = User::where('email', self::EMAIL)->first();
        $this->assertEquals(self::FIRST_NAME, $savedUser->first_name);
        $this->assertEquals(self::LAST_NAME, $savedUser->last_name);
        $this->assertEquals(self::EMAIL, $savedUser->email);
        $this->assertEquals(Hash::check(self::PASSWORD, $savedUser->password), true);
    }

    public function testUserAlreadyExist()
    {
        $response = $this->json('POST', '/api/register', [
            'first_name'    =>  self::FIRST_NAME,
            'last_name'    =>  self::LAST_NAME,
            'email'    =>  self::EMAIL,
            'password'  =>  self::PASSWORD,
        ]);

        $response
            ->assertStatus(422)
            ->assertExactJson([
                "email" => [
                    "The email has already been taken."
                ]
            ]);
    }

    public function testRegisterUserIsDeleted()
    {
        $savedUser = User::where('email', self::EMAIL)->first();
        $savedUser->delete();
        $this->assertEquals(null, User::where('email', self::EMAIL)->first());
    }
}
