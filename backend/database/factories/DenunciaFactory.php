<?php

namespace Database\Factories;

use App\Models\Denuncia;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enum\tipodenuncia;

/**
 * @extends Factory<Denuncia>
 */
class DenunciaFactory extends Factory
{
    protected $model = Denuncia::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'tipo' => $this->faker->randomElement(tipodenuncia::cases()),
            'descricao' => $this->faker->paragraph(),
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => function (array $attributes) {
                return $attributes['created_at'];
            },
        ];
    }
}
