<?php

namespace Modules\Backend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Frontend\App\Models\OrderInvoice;


class AffiliateProfit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $table ="affiliate_profits";

    protected $fillable = [
        'user_id', 'product_id', 'affiliate_percent', 'product_price', 'affiliate_amount', 'order_invoice_id', 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orderInvoice()
    {
        return $this->belongsTo(OrderInvoice::class, 'order_invoice_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function orderInvoices()
    {
        return $this->hasMany(OrderInvoice::class, 'affiliate_profit_id', 'id');
    }

}
