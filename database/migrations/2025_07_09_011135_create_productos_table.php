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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string("name", 100)->unique();
            //SEO
            $table->string("slug",100);
            $table->string("title",190);
            $table->string("description",290);
            $table->string("image",100); //1000X480
            $table->string("code",10)->nullable();
            $table->integer("stock")->default(0);
            $table->decimal("price",7,2)->default(0.00);
            $table->text("details")->nullable();
            $table->integer("visits")->default(0);
            $table->integer("order")->default(0);
            $table->foreignId("categoria_id")->references('id')->on("categorias")->onUpdate('cascade')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
