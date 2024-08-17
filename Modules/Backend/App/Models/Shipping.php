<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Backend\Database\factories\ShippingFactory;

class Shipping extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */

    protected $table="shippings";

    protected $fillable = [
        'name', 'in_dhaka', 'out_dhaka', 'details', 'status', 'slug'
    ];

    public function product()
    {
        return $this->hasOne(Product::class, 'shipping_id', 'id');
    }


    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }

}
