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
        Schema::create('affiliate_profits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id',false)->foreign("user_id")->references('id')->on('users')->restrictOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger('product_id',false)->foreign("product_id")->references('id')->on('products')->restrictOnDelete()->cascadeOnUpdate();
            $table->integer('affiliate_percent');
            $table->string('product_price');
            $table->string('affiliate_amount');
            $table->integer('order_invoice_id');
            $table->string('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_profits');
    }
};
