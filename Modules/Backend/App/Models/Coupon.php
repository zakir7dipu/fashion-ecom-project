<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Backend\Database\factories\CouponFactory;
use Modules\Frontend\App\Models\OrderInvoice;

class Coupon extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "coupons";

    protected $fillable = [
        'coupon_name', 'order_count', 'order_amount', 'coupon_percent','coupon_fixed_amount', 'details', 'coupon_validity_date', 'status', 'slug'
    ];

    public function orderInvoice()
    {
        return $this->hasOne(OrderInvoice::class, 'coupon_id', 'id');
    }

    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }
}
