<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Acolher;

class AcolherSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Acolher::factory()->count(50)->create();
    }
}
