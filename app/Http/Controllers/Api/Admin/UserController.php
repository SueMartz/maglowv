<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;



class UserController extends Controller
{
    //
    public function index()
    {
        $data = User::whereHas('roles',function($q){
            $q->where("name","cliente");
        })->get(["id","name"]);
        return response()->json($data,200);

    }

    public function store(Request $request)
    {
        
    }

    public function show($id)
    {
        $data = User::find($id);
        return response()->json($data,200);
    }

    public function update(Request $request,$id){
        $data = User::find($id);
        
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);


    }

}
