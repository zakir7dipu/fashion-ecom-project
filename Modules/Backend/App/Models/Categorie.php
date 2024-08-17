<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Frontend\App\Models\Order;


class Categorie extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */

    protected $table = "categories";

    protected $fillable = [
        'name', 'status'
    ];

    public function subCategories()
    {
        return $this->hasMany(SubCategorie::class, 'categorie_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'categorie_id', 'id');
    }

    public function orders()
    {
        return $this->belongsTo(Order::class, 'categorie_id', 'id');
    }

}
