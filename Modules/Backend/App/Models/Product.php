<?php

namespace Modules\Backend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Modules\Frontend\App\Models\Order;
use Modules\Frontend\App\Models\WishList;


class Product extends Model
{
    use HasFactory,SoftDeletes,Searchable;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "products";

    protected $fillable = [
        'categorie_id', 'sub_category_id', 'sub_sub_category_id', 'supplier_id', 'name', 'sku', 'regular_price', 'sale_price', 'discount_percent', 'discount_amount', 'description','shipping_id', 'colors','material', 'size', 'tags', 'in_stock','hot_product','offer_for_you','return_exchange_policy','affiliate_percent','affiliate_percent_user', 'is_affiliate','slug', 'status','create_by_user_id'
    ];

    public function productImage()
    {
        return $this->hasOne(ProductImage::class, 'product_id', 'id');
    }

    public function imageGallerys()
    {
        return $this->hasMany(ImageGallery::class, 'product_id', 'id');
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

    public function user()
    {
        return $this->belongsTo(User::class, 'create_by_user_id', 'id');
    }

    public function shipping()
    {
        return $this->belongsTo(Shipping::class, 'shipping_id', 'id');
    }

    public function affiliateProfits()
    {
        return $this->hasMany(AffiliateProfit::class, 'product_id', 'id');
    }

    public function inventorie()
    {
        return $this->hasOne(Inventorie::class, 'product_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'product_id', 'id');
    }

    public function wishLists()
    {
        return $this->hasMany(WishList::class, 'product_id', 'id');
    }


    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            'sku' => $this->sku,
            'description' => $this->description,
            'slug' => $this->slug,
        ];
    }

    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }
}
