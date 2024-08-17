<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanySetup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'contact', 'payment_no', 'email', 'social_link', 'company_logo', 'trending', 'trending_image'
    ];
}
