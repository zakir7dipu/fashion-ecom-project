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
        Schema::create('sub_sub_categorys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sub_categorie_id',false)->foreign("sub_categorie_id")->references('id')->on('sub_categories')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->enum('status',['1','0']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_sub_categorys');
    }
};
