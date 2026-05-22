<?php

namespace Database\Factories;

use App\Models\Acolher;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enum\Turno;
use App\Enum\Humor;
use App\Enum\Genero;
use App\Enum\Curso;

/**
 * @extends Factory<Acolher>
 */
class AcolherFactory extends Factory
{
    protected $model = Acolher::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Gera um nome completo realista
            'nome'    => $this->faker->name(),

            // Escolhe aleatoriamente ou deixa nulo (já que é opcional)
            'genero'  => $this->faker->randomElement(Genero::cases()),

            // Cursos fictícios do IF
            'curso'   => $this->faker->randomElement(Curso::cases()),

            // O validador exige string, então geramos um número de 1 a 4 convertido em texto
            'periodo' => (string) $this->faker->numberBetween(1, 4),

            // Puxa aleatoriamente um dos casos definidos no seu Enum de Turno
            'turno'   => $this->faker->randomElement(Turno::cases()),

            // Puxa aleatoriamente um dos casos definidos no seu Enum de Humor
            'humor'   => $this->faker->randomElement(Humor::cases()),

            // Cria datas aleatórias dos últimos 30 dias (ótimo para testar gráficos de tendência)
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => function (array $attributes) {
                return $attributes['created_at'];
            },
        ];
    }
}
