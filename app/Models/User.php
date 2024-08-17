<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Modules\Backend\App\Models\AffiliateProfit;
use Modules\Backend\App\Models\OrderDetailsLog;
use Modules\Backend\App\Models\Product;
use Modules\Frontend\App\Models\Customer;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'image',
        'is_update',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function products()
    {
        return $this->hasMany(Product::class, 'user_id', 'id');
    }

    public function affiliateProfits()
    {
        return $this->hasMany(AffiliateProfit::class, 'user_id', 'id');
    }

    public function customer()
    {
        return $this->hasOne(Customer::class, 'user_id', 'id');
    }

    public function orderDetailsLogs()
    {
        return $this->hasMany(OrderDetailsLog::class, 'user_id', 'id');
    }

}
