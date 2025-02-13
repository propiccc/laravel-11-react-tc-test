<?php

namespace Database\Seeders;

use App\Models\Posts;
use App\Models\Tags;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'admin',
            'email' => 'test@example.com',
            'password' => 'admin@123',
            'role' => 'admin'
        ]);

        for ($i=0; $i < 10; $i++) {
            Posts::create([
                'title' => fake()->text(10),
                'content' => fake()->text(),
            ]);
            Tags::create([
                'tags_name' => fake()->text(10),
            ]);
        }
    }
}
