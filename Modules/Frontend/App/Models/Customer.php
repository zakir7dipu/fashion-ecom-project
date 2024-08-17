<?php

namespace Modules\Frontend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Customer extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table ="customers";

    protected $fillable = [
        'user_id', 'phone','email', 'address', 'district', 'post_code', 'affiliate_amount', 'affiliate_amount_used', 'affiliate_amount_blanch', 'slug'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orderInvoices()
    {
        return $this->hasMany(OrderInvoice::class, 'customer_id', 'id');
    }

    public function customerPayments()
    {
        return $this->hasMany(CustomerPayment::class, 'customer_id', 'id');
    }


    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }

}
