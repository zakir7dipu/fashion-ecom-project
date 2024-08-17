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
        Schema::create('wish_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id',false)->foreign("product_id")->references('id')->on('products')->restrictOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger('customer_id',false)->foreign("customer_id")->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->string('quantity');
            $table->string('product_image');
            $table->string('regular_price');
            $table->string('sale_price');
            $table->integer('user_id');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wish_lists');
    }
};
