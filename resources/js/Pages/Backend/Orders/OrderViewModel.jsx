import {Button, Modal} from "react-bootstrap";
import {useInternalLink} from "@/Library/Helper";
import React, {useEffect, useState} from "react";
import '../../../../css/StyleCustom.css';
import Style from "./OrderViewModel.module.css";

export default function OrderViewModel ({ action, invoiceOrder, id, onClose }) {
    const {orders,affiliate_profit} = invoiceOrder
    return(
        <>
            <Modal size="lg" show={action}  onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Orders View</Modal.Title>
                </Modal.Header>
                <form>
                    <div className="container">
                        <div className="row">
                            <table className="table">
                                <tbody>
                                {orders&&orders.map((row, index) => (
                                    <tr key={index}>
                                        <td className={`d-flex ${Style.product_thumbnail}`}>
                                            <a href="#">
                                                <img src={useInternalLink(row?.product?.product_image?.product_image_small)} alt="product1" />
                                            </a>
                                        </td>
                                        <td className={Style.product_name}>
                                            <span className="mb-2">{row?.product?.name} </span>
                                            <div className="color">
                                                Color : {row?.color}
                                            </div>
                                            <div className="size">
                                                Size : {row?.size}
                                            </div>
                                            <div className="product-price" data-title="Price">
                                                Unit Price : ৳{row?.sale_price}
                                            </div>
                                            <div className="size">
                                                Quantity : {row?.quantity}
                                            </div>
                                            <div className="size">
                                                Total : {row?.sale_amount_total}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="col-md-12 mb-3">
                                <div className="border">
                                    <div className="heading_s1 mb-3">
                                        <h6 className="p-2">Payment Details</h6>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td className="cart_total_label text-left">Sell Invoice</td>
                                                <td className="cart_total_amount text-right">৳ {invoiceOrder?.sale_price}</td>
                                            </tr>

                                            <tr>
                                                <td className="cart_total_label text-left">Affiliate  Discount : <span style={{marginLeft:'20px',color:"red",fontWeight:"bold"}}> {affiliate_profit?.user?.customer?.slug}</span></td>
                                                <td className="cart_total_amount text-right">৳ {invoiceOrder?.affiliate_amount_total?invoiceOrder?.affiliate_amount_total:0}</td>
                                            </tr>

                                            <tr>
                                                <td className="cart_total_label text-left">Coupon Discount :  <span style={{marginLeft:'20px',color:"red",fontWeight:"bold"}}>  {invoiceOrder?.coupon?.coupon_name}</span></td>
                                                <td className="cart_total_amount text-right">৳ {invoiceOrder?.coupon_discount_amount?invoiceOrder?.coupon_discount_amount:0}</td>
                                            </tr>
                                            <tr>
                                                <td className="cart_total_label text-left">Sub Total</td>
                                                <td className="cart_total_amount text-right">৳ {invoiceOrder?.invoice_amount}</td>
                                            </tr>
                                            <tr>
                                                <td className="cart_total_label text-left">Shipping Charge</td>
                                                <td className="cart_total_amount text-right">৳ {invoiceOrder?.shipping_charge}</td>
                                            </tr>
                                            <tr>
                                                <td className="cart_total_label text-left">Grant Total</td>
                                                <td className="cart_total_amount text-right"><strong>৳ {parseInt(invoiceOrder?.invoice_amount) + parseInt(invoiceOrder?.shipping_charge)}</strong></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
