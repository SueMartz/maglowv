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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string("nombre", 100);
            $table->string("slogan",100);
            $table->string("title",190);
            $table->text("description");
            $table->string("logo");
            $table->string("seo");
            $table->string("favicon");
            $table->string("direccion",190);
            $table->string("celular",15);
            $table->string("email",15);
            $table->string("facebook",100)->nullable();
            $table->string("instagram",100)->nullable();
            $table->string("tiktok",100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
