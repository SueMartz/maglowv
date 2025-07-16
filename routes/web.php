<?php

//use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;

//$role = Role::create(['name' =>'admin']);
//$role = Role::create(['name' =>'cliente']);

Route::get('/{any}', function () {
    return view('welcome');
});

