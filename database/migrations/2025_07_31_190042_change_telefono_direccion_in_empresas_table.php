<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->string('telefono', 255)->change();
            $table->string('direccion', 255)->change();
        });
    }

    public function down()
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->string('telefono', 9)->change();
            $table->string('direccion', 200)->change();
        });
    }
};
