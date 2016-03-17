<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Hash;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;

class UserController extends Controller
{
    public function start(Request $request) {
        $email = $request->get('email');
        $user = User::where('email', $email)->first();

        if ($user) {
            return $this->login($request, $user);
        }

        return $this->register($request, $user);
    }

    protected function login($request, $user)
    {
        $password = $request->get('password');

        if (Hash::check($password, $user->password)) {
            return $this->getToken($user);
        } else {
            return response()->json([
              'message' => trans('api.user.wrongPassword')
            ], 422);
        }
    }

    protected function register($request, $user)
    {
        $fields = $request->all();
        $validator = $this->registerValidator($fields);

        if ($validator->fails()) {
          return response()->json([
            'message' => implode(' ', $validator->messages()->all())
          ], 422);
        }

        $user = $this->create($fields);
        $user->email = $fields['email'];
        $user->password = bcrypt($fields['password']);
        $user->save();

        return $this->getToken($user);
    }

    public function account(Request $request)
    {
        return $request->user;
    }

    protected function getToken($user)
    {
        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json([
                'message' => trans('api.token.cantCreate')
            ], 500);
        }

        return response()->json(compact('token', 'user'));
    }

    protected function create(array $data)
    {
        $user = new User($data);
        $user->email = $data['email'];
        $user->save();
        return $user;
    }

    public function update(Request $request)
    {
        $user = $request->user;
        $fields = $request->all();
        $validator = $this->updateValidator($fields);

        if ($validator->fails()) {
          return response()->json([
            'message' => implode(' ', $validator->messages()->all())
          ], 422);
        }

        $user->update($fields);

        return [];
    }

    protected function registerValidator(array $data)
    {
        return Validator::make($data, [
            'name' => 'max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);
    }

    protected function updateValidator(array $data)
    {
        return Validator::make($data, [
            'name' => 'max:255'
        ]);
    }
}
