<?php

namespace Modules\Backend\App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Frontend\App\Models\OrderInvoice;

class OrderDetailsLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */

    protected $table = "order_details_logs";

    protected $fillable = [
        'order_invoice_id','note','date','user_id'
    ];

    public function orderInvoice()
    {
        return $this->belongsTo(OrderInvoice::class, 'order_invoice_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


}
