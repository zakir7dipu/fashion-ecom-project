<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Modules\MainSetting\app\Models\Office;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dt = Carbon::now();
        $dateNow = $dt->toDateTimeString();

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'amfashion@gmail.com',
            'phone' => '01823151351',
            'email_verified_at' => NULL,
            'remember_token' => NULL,
            'status' => 1,
            'is_update' => 1,
            'created_at' => $dateNow,
            'updated_at' => $dateNow,
            'password' => Hash::make('123'),
        ]);
        $user->assignRole('super_admin');
    }
}
