<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear el rol 'admin' si no existe
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Crear el usuario admin
        $user = User::firstOrCreate(
            ['email' => 'admin@maglowv.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('12345678'),
            ]
        );

        // Asignar el rol al usuario si no lo tiene
        if (!$user->hasRole('admin')) {
            $user->assignRole($role);
        }

        // Esto sería redundante si usas Spatie, pero si quieres asegurstore:
        DB::table('model_has_roles')->updateOrInsert([
            'role_id' => $role->id,
            'model_type' => 'App\Models\User',
            'model_id' => $user->id,
        ]);
    }
}
