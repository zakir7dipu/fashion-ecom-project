<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Frontend\App\Models\Order;


class SubSubCategory extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "sub_sub_categorys";

    protected $fillable = [
        'sub_categorie_id', 'name', 'status'
    ];

    public function subCategorie()
    {
        return $this->belongsTo(SubCategorie::class, 'sub_categorie_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'sub_sub_category_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'sub_sub_category_id', 'id');
    }
}
