<?php

namespace Modules\Frontend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Modules\Backend\App\Models\AffiliateProfit;
use Modules\Backend\App\Models\Coupon;
use Modules\Backend\App\Models\OrderDetailsLog;


class OrderInvoice extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "order_invoices";

    protected $fillable = [
        'customer_id', 'invoice', 'sale_count', 'sale_price', 'coupon_id','affiliate_profit_id', 'coupon_discount_amount', 'affiliate_amount_total', 'invoice_amount', 'sale_date', 'delivery', 'shipping_charge', 'parcel_shipping_details', 'note', 'delivery_date', 'status', 'update_by', 'slug'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'order_invoice_id', 'id');
    }

    public function customerPayment()
    {
        return $this->hasOne(CustomerPayment::class, 'order_invoice_id', 'id');
    }

    public function updateBy()
    {
        return $this->belongsTo(User::class, 'update_by', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'id');
    }

    public function affiliateProfit()
    {
        return $this->belongsTo(AffiliateProfit::class, 'affiliate_profit_id', 'id');
    }

    public function orderDetailsLogs()
    {
        return $this->hasMany(OrderDetailsLog::class, 'order_invoice_id', 'id');
    }

    public function affiliateProfits()
    {
        return $this->hasMany(AffiliateProfit::class, 'order_invoice_id', 'id');
    }

//
//    public static function generateUniqueCode()
//    {
//        do {
////            $code = strtoupper(Str::random(8));
//            $code = mt_rand(pow(10, 13), pow(10, 14) - 1);
//        } while (self::codeExists($code));
//
//        return $code;
//    }

    public static function generateUniqueCode()
    {
        do {
            // Generate an 8-digit random number
            $code = mt_rand(10000000, 99999999);
        } while (self::codeExists($code));

        return $code;
    }

    protected static function codeExists($code)
    {
        return self::where('invoice', $code)->exists();
    }


    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }
}
