<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('categorias', function (Blueprint $table) {
        $table->string('urlfoto', 50)->nullable()->after('orden'); // ajusta 'orden' si quieres colocar después de otra columna
    });
}

public function down()
{
    Schema::table('categorias', function (Blueprint $table) {
        $table->dropColumn('urlfoto');
    });
}
};
