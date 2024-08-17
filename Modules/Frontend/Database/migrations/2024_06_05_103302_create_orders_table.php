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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_invoice_id',false)->foreign("order_invoice_id")->references('id')->on('order_invoices')->restrictOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger('product_id',false)->foreign("product_id")->references('id')->on('products')->restrictOnDelete()->cascadeOnUpdate();
            $table->integer('categorie_id');
            $table->integer('sub_category_id');
            $table->integer('sub_sub_category_id')->nullable();
            $table->string('regular_price')->default(0)->nullable();
            $table->string('sale_price');
            $table->string('quantity');
            $table->string('sale_amount_total');
            $table->string('flat_discount')->default(0)->nullable();
            $table->string('actual_amount')->default(0)->nullable();
            $table->string('affiliate_amount')->default(0)->nullable();
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->string('product_barcode')->nullable();
            $table->string('product_serial')->nullable();
            $table->string('sale_date');
            $table->integer('update_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
