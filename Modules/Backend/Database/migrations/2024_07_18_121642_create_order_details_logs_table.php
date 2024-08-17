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
        Schema::create('order_details_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_invoice_id',false)->foreign("order_invoice_id")->references('id')->on('order_invoices')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('note');
            $table->string('date');
            $table->string('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details_logs');
    }
};
