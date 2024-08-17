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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_name');
            $table->integer('order_count')->nullable()->default(0);
            $table->integer('order_amount')->nullable()->default(0);
            $table->integer('coupon_percent')->nullable()->default(0);
            $table->integer('coupon_fixed_amount')->nullable()->default(0);
            $table->string('details')->nullable();
            $table->string('coupon_validity_date');
            $table->enum('status',['1','2'])->comment('active/deactive');
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
        Schema::dropIfExists('coupons');
    }
};
