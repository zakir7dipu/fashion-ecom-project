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
        Schema::create('sub_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categorie_id',false)->foreign("categorie_id")->references('id')->on('categories')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->enum('new_arrival',['2','1'])->comment('no/yes');
            $table->enum('status',['1','0']);
            $table->enum('home_show',['1','0']);
            $table->string('image');
            $table->string('slug');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_categories');
    }
};
