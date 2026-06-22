<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('denuncia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('denunciante_id')
                ->nullable()
                ->constrained('denunciante')
                ->onDelete('cascade')
                ;

            $table->string('tipo');
            $table->text('descricao');
            $table->dateTime('data_ocorrencia')->nullable();
            $table->string('local_ocorrencia')->nullable();
            $table->string('pessoa_afetada');
            $table->string('testemunha')->nullable();
            $table->string('status')->default('Pendente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('denuncia');
    }
};
