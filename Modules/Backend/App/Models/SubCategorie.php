<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Frontend\App\Models\Order;

class SubCategorie extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "sub_categories";

    protected $fillable = [
        'categorie_id', 'name','new_arrival', 'image', 'slug','home_show','status'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id');
    }

    public function subSubCategorys()
    {
        return $this->hasMany(SubSubCategory::class, 'sub_categorie_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'sub_category_id', 'id');
    }

    public function orders()
    {
        return $this->belongsTo(Order::class, 'sub_category_id', 'id');
    }

    public static function boot(){
        parent::boot();
        static::creating(function($query){
            $bytes = random_bytes(6);
            $query->slug = bin2hex($bytes);
        });
    }
}
