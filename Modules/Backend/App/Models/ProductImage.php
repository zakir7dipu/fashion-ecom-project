<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ProductImage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "product_images";

    protected $fillable = [
        'product_id', 'featured_image', 'arrival_image', 'product_image', 'size_chart_image', 'measure_image', 'product_image_large','product_image_big','product_image_small'
    ];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }


}
