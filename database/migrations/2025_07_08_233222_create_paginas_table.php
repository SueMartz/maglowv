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
        Schema::create('paginas', function (Blueprint $table) {
            $table->id();
            $table->string("name", 100)->unique();
            //SEO
            $table->string("slug",100);
            $table->string("title",190);
            $table->string("description",290);
            $table->string("image",100); //1000X480
            $table->text("texttop");
            $table->text("textbottom");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paginas');
    }
};
