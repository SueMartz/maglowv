<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
   
    public function register(Request $request)
{
    $response = ["success" => false];

    // Validación
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
    ]);

    if ($validator->fails()) {
        return response()->json([
            "success" => false,
            "errors" => $validator->errors()
        ], 422);
    }

    $input = $request->all();
    $input["password"] = bcrypt($input['password']);

    $user = User::create($input);
    $user->assignRole('Cliente'); // asegúrate que exista ese rol

    $response["success"] = true;
    $response["user"] = $user;
    // $response["token"] = $user->createToken("Codea")->plainTextToken;

    return response()->json($response, 201);
}

    public function login(Request $request)
{
    $response = ["success" => false];

    // Validación
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        $response = ["error"=>$validator->errors()];
        return response()->json($response, 200);
    }

    if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = auth()->user();
        $user->hasRole('client');

        $response['token'] = $user->createToken("codea.app")->plainTextToken;
        $response['user'] = $user;
        $response['message'] = "Logueado";
        $response['success'] = true;
    }

    return response()->json($response, 200);
}

    public function logout()
    {   
        $response=["success"=>false];
        auth()->user()->tokens()->delete();
        $response=[
            "success"=>true,
             "message"=>"Sesion cerrada"

        ];
        return response()->json($response);
    }
}
