<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Backend\Database\factories\HomeSliderFactory;

class HomeSlider extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "home_sliders";

    protected $fillable = [
        'name','image'
    ];

    protected static function newFactory(): HomeSliderFactory
    {
        //return HomeSliderFactory::new();
    }
}
