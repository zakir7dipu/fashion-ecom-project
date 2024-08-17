<?php

namespace Modules\Backend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ReturnPolicy extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */

    protected $table = "return_policys";

    protected $fillable = ['offer_for_you','return_exchange_policy'];


}
