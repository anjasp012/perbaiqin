<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'User',
                'email' => 'user@user.com',
                'password' => bcrypt('password'),
            ],
        ])->each(fn ($user) => \App\Models\User::create($user));
    }
}
