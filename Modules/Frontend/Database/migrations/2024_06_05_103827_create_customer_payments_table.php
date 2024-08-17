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
        Schema::create('customer_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id',false)->foreign("customer_id")->references('id')->on('customers')->restrictOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger('order_invoice_id',false)->foreign("order_invoice_id")->references('id')->on('order_invoices')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('date');
            $table->integer('payment_type_setting_id');
            $table->string('invoice_amount')->nullable()->default(0);
            $table->string('shipping_charge')->nullable()->default(0);
            $table->string('payment_details')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_payments');
    }
};
