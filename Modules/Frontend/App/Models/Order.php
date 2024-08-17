<?php

namespace Modules\Frontend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Backend\App\Models\Categorie;
use Modules\Backend\App\Models\Product;
use Modules\Backend\App\Models\SubCategorie;
use Modules\Backend\App\Models\SubSubCategory;


class Order extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table ="orders";

    protected $fillable = [
        'order_invoice_id', 'product_id', 'categorie_id', 'sub_category_id', 'sub_sub_category_id', 'regular_price','sale_price', 'quantity', 'sale_amount_total', 'flat_discount', 'actual_amount', 'affiliate_amount', 'size', 'color', 'product_barcode', 'product_serial', 'sale_date', 'update_by'
    ];

    public function orderInvoice()
    {
        return $this->belongsTo(OrderInvoice::class, 'order_invoice_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id');
    }

    public function subCategorie()
    {
        return $this->belongsTo(SubCategorie::class, 'sub_category_id', 'id');
    }

    public function subSubCategory()
    {
        return $this->belongsTo(SubSubCategory::class, 'sub_sub_category_id', 'id');
    }

    public function updateBy()
    {
        return $this->belongsTo(User::class, 'update_by', 'id');
    }


}
