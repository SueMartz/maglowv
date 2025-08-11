<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('empresas', function (Blueprint $table) {
            // Primero elimina la foreign key, para evitar error
            $table->dropForeign(['categoria_id']);
            // Luego elimina la columna
            $table->dropColumn('categoria_id');
        });
    }

    public function down()
    {
        Schema::table('empresas', function (Blueprint $table) {
            // Recrear columna y clave foránea en caso de rollback
            $table->foreignId('categoria_id')->constrained('categorias')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }
};
