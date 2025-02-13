<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Helpers\RestApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:2'],
            'email' => ['required', 'email', 'min:4', 'unique:users,email'],
            'password' => ['required', 'confirmed'],
        ]);


        if ($validator->fails()) {
            return RestApi::error("Validation Errors", 422, [
                'errors' => $validator->errors()->messages()
            ]);
        }

        DB::beginTransaction();
        try {

            $data = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            DB::commit();
            return RestApi::success($data, 201, 'Success');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    public function login(Request $request)
    {
        $messageSet = [];
        $validation = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:4'],
            'password' => ['required', 'min:1']
        ], $messageSet);

        if ($validation->fails()) {
            return RestApi::error('Validation Error', 422, $validation->errors()->messages());
        }

        try {
            $user = User::where('name', $request->username)->first();

            if (!isset($user->id)) {
                return RestApi::error('No Data Found !!!', 404);
            }

            if (Auth::attempt(['email' => $user->email, 'password' => $request->password])) {
                $success['token'] = $user->createToken('auth_token')->plainTextToken;
                return RestApi::success($success, 200);
            } else {
                return RestApi::error('Failed While Autorize !!!', 400);
            }
        } catch (\Throwable $exception) {
            //throw $th;
            return RestApi::error($exception->getMessage(), 400);
        }
    }

    public function checkUser()
    {
        return RestApi::success(['auth' => Auth::guard('api')->check(), 'user' => Auth::guard('api')->user()]);
    }

    public function logout(Request $request)
    {
        try {
            Auth::logout();
        } catch (\Throwable $th) {
            throw $th;
        }
        return response()->json('Logout', 200);
    }
}
