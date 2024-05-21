<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $city = ['Jakarta', 'Bandung', 'Solo', 'Yogyakarta'];
        // Create vendors
        for ($i = 1; $i <= 10; $i++) {
            $vendor = [
                'name' => $faker->company,
                'full_name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'), // Default password is 'password'
                'phone' => $faker->phoneNumber,
                'ktp' => 'ktp-',
                'city' => $city[rand(0, 3)],
                'country' => 'Indonesia',
                'address' => $faker->address,
                'image' => 'vendor' . $i . '.jpg', // Assuming you have images named vendor1.jpg, vendor2.jpg, etc.
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $vendorId = DB::table('vendors')->insertGetId($vendor);

            // Create products for each vendor
            for ($j = 1; $j <= 10; $j++) {
                $productName = $faker->name;
                $productSlug = Str::slug($productName);
                $product = [
                    'name' => $productName,
                    'slug' => $productSlug,
                    'image' => 'product' . $j . '.jpg', // Assuming you have images named product1.jpg, product2.jpg, etc.
                    'description' => $faker->paragraph,
                    'price' => $faker->numberBetween(10, 100), // Random price between 10 and 100
                    'vendor_id' => $vendorId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                DB::table('products')->insert($product);
            }
        }
    }
}
