<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Denuncia;
class DenunciaSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Denuncia::factory()->count(50)->create();
    }
}
