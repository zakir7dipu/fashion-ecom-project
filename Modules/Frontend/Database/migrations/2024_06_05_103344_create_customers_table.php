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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id',false)->foreign("user_id")->references('id')->on('users')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('phone');
            $table->longText('address');
            $table->string('email')->nullable();
            $table->string('district');
            $table->integer('post_code')->nullable();
            $table->string('affiliate_amount')->nullable()->default(0);
            $table->string('affiliate_amount_used')->default(0);
            $table->string('affiliate_amount_blanch')->default(0);
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
        Schema::dropIfExists('customers');
    }
};
