<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $permissions = ['user','setting','product','affiliate','payment','orders','customer'];
        foreach ($permissions as $permission){
            Permission::create([
                'name' => $permission
            ]);
        }
        $role = Role::findByName('super_admin');
        $role->givePermissionTo(Permission::all());
    }
}
