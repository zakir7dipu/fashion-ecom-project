<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ImageGallery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $table="image_gallery";

    protected $fillable = [
        'image','product_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

}
