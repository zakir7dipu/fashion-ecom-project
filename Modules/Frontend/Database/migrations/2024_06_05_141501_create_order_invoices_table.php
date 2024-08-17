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
        Schema::create('order_invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id',false)->foreign("customer_id")->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('invoice');
            $table->integer('sale_count');
            $table->string('sale_price');
            $table->integer('coupon_id')->nullable();
            $table->integer('affiliate_profit_id')->nullable();
            $table->string('coupon_discount_amount')->nullable()->default(0);
            $table->string('affiliate_amount_total')->default(0)->nullable();
            $table->string('invoice_amount');
            $table->string('sale_date');
            $table->string('delivery')->comment('home/office');
            $table->string('shipping_charge')->nullable()->default(0);
            $table->longText('parcel_shipping_details')->nullable();
            $table->longText('note')->nullable();
            $table->string('delivery_date')->nullable();
            $table->enum('status',['1','2','3','4','5'])->comment('order/process/delivery/success/return');
            $table->integer('update_by')->nullable();
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
        Schema::dropIfExists('order_invoices');
    }
};
