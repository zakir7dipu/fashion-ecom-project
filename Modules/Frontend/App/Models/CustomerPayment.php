<?php

namespace Modules\Frontend\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Backend\App\Models\PaymentTypeSetting;


class CustomerPayment extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "customer_payments";

    protected $fillable = [
        'customer_id', 'order_invoice_id', 'date', 'payment_type_setting_id', 'invoice_amount', 'shipping_charge', 'payment_details'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function orderInvoice()
    {
        return $this->belongsTo(OrderInvoice::class, 'order_invoice_id', 'id');
    }

    public function paymentTypeSetting()
    {
        return $this->belongsTo(PaymentTypeSetting::class, 'payment_type_setting_id', 'id');
    }

}
