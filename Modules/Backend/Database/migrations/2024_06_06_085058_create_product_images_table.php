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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id',false)->foreign("product_id")->references('id')->on('products')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('featured_image');
            $table->string('arrival_image');
            $table->string('product_image');
            $table->string('product_image_large');
            $table->string('product_image_big');
            $table->string('product_image_small');
            $table->string('size_chart_image')->nullable();
            $table->string('measure_image')->nullable();
//            $table->longText('gallery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_image');
    }
};
