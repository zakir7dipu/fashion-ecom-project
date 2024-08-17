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

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categorie_id',false)->foreign("categorie_id")->references('id')->on('categories')->restrictOnDelete()->cascadeOnUpdate();
            $table->integer('sub_category_id')->nullable();
            $table->integer('sub_sub_category_id')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->string('name');
            $table->string('sku')->nullable();
            $table->string('regular_price')->default(0);
            $table->string('sale_price')->default(0);
            $table->string('discount_percent')->nullable()->default(0);;
            $table->string('discount_amount')->nullable()->default(0);;
            $table->string('shipping_id');
            $table->longText('description');
            $table->longText('offer_for_you');
            $table->longText('return_exchange_policy');
            $table->string('colors')->nullable();
            $table->string('size')->nullable();
            $table->string('material')->nullable();
            $table->string('tags')->nullable();
            $table->boolean('in_stock')->default(1);
            $table->string('affiliate_percent')->nullable()->default(0)->comment("affiliate discount for customer");
            $table->string('affiliate_percent_user')->nullable()->default(0)->comment("affiliate amount get for user");
            $table->boolean('is_affiliate')->default(0);
            $table->enum('hot_product',['2','1'])->comment('not-2/yes-1');
            $table->string('slug');
            $table->enum('status',['1','2'])->comment('active/deactivate');
            $table->integer('create_by_user_id')->comment('product add by login id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
