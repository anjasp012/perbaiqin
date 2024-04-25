<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class TechnicianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create specialties
        $specialties = [
            ['name' => 'Electrical', 'description' => 'Specializes in electrical installations, repairs, and maintenance.'],
            ['name' => 'Plumbing', 'description' => 'Provides plumbing services such as pipe installation, repair, and maintenance.'],
            ['name' => 'HVAC', 'description' => 'Offers heating, ventilation, and air conditioning services for residential and commercial properties.'],
            ['name' => 'Appliance Repair', 'description' => 'Specializes in repairing household appliances such as refrigerators, washers, dryers, and more.'],
            ['name' => 'Roofing', 'description' => 'Provides roofing installation, repair, and replacement services for residential and commercial buildings.'],
            ['name' => 'Painting', 'description' => 'Offers interior and exterior painting services for residential and commercial properties.'],
            ['name' => 'Landscaping', 'description' => 'Provides landscaping design, installation, and maintenance services for outdoor spaces.'],
            ['name' => 'Carpentry', 'description' => 'Specializes in carpentry work including furniture making, framing, and finishing.'],
        ];

        // Insert specialties into the database
        foreach ($specialties as $specialty) {
            $specialty['slug'] = Str::slug($specialty['name']);
            $specialtyId = DB::table('specialists')->insertGetId($specialty);
            $specialty['id'] = $specialtyId;
        }

        // Define faker instance
        $faker = Faker::create();

        // Generate fake technicians
        for ($i = 0; $i < 50; $i++) {
            $name = $faker->name;
            $slug = Str::slug($name);
            $email = $faker->unique()->safeEmail;
            $password = Hash::make('password');
            $phone = $faker->phoneNumber;
            $price = $faker->randomNumber(6);

            // Insert technician
            $technicianId = DB::table('technicians')->insertGetId([
                'name' => $name,
                'slug' => $slug,
                'email' => $email,
                'password' => $password,
                'phone' => $phone,
                'price' => $price,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Attach random specialties to the technician
            $randomSpecialties = collect($specialties)->random(rand(1, count($specialties)));
            foreach ($randomSpecialties as $specialty) {
                DB::table('technician_specialists')->insert([
                    'technician_id' => $technicianId,
                    'specialist_id' => $specialtyId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
