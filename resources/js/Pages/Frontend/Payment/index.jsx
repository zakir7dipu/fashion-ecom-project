import React, {useEffect, useState} from 'react';
import {Head, Link, useForm} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {inertiaErrorMessage, successMessage, ucwords, useInternalLink, warningMessage} from "@/Library/Helper";
import Button from "react-bootstrap/Button";
import checkIcon from "../../../../home_asset/common/Vector.png";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {route} from "ziggy-js";
import ProcessBtn from "@/Pages/Frontend/BottomNav/ProcessBtn.jsx";

export default function Index({invoice, paymentTypes}) {
    const style = {
        customRatio: {
            border: "1px solid black",
            marginPight: "5px",
            paddingTop: "20px",
            paddingLeft: "30px"
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const orders = invoice?.orders

    const {data, setData, errors, progress, processing, post, reset} = useForm({
        'user_id': "", 'customer_id': "", 'invoice': "", 'status': "", 'shipping_type': ""
    });

    const submit = (e) => {
        e.preventDefault();
        let message, url
        message = "Order Success";
        url = route('checkout_success.order');
        post((url), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage(message);
                reset()
            },
            onError: (err) => {
                inertiaErrorMessage(err)
                setIsLoading(false);
            }
        });
    };


    const handleOptionChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        setData(data => ({...data, invoice: invoice?.invoice}));
        setData(data => ({...data, status: invoice?.status}));
        setData(data => ({...data, customer_id: invoice?.customer?.id}));
        setData(data => ({...data, user_id: invoice?.customer?.user_id}));
    }, [invoice]);

    useEffect(() => {
        const defaultOption = paymentTypes.find(type => type.is_default)?.name || "";
        setSelectedOption(defaultOption);
    }, [paymentTypes]);


    useEffect(() => {
        setData(data => ({...data, shipping_type: selectedOption}));
    }, [selectedOption]);


    return (
        <>
            <GuestLayout>
                <Head title="Product Check Out"/>
                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />
                <div className="main_content">
                    <div className="section">
                        <div className="container mt-5 mb-5">
                            <div className="row">
                                <div className="col-md-7">
                                    {data?.status == 1 ?
                                        <>
                                            <div className="heading_s1">
                                                <h4>Payment Option</h4>
                                            </div>
                                            <form onSubmit={(e) => submit(e)} encType="multipart/form-data">
                                                <div className="ship_detail">
                                                    <div className="form-group mb-3">
                                                        <div className="chek-form col-12 d-flex">
                                                            {paymentTypes && paymentTypes.map((row, i) => (
                                                                <div
                                                                    className={`custome-radioo col-3 mb-4`}
                                                                    key={i}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        required
                                                                        type="radio"
                                                                        name="payment_option"
                                                                        id={`payment_option_${i}`}
                                                                        value={row?.name}
                                                                        checked={selectedOption === row?.name}
                                                                        onChange={() => handleOptionChange(row?.name)}
                                                                        style={{marginTop: "25px", style}}
                                                                    />
                                                                    <label className="form-check-label"
                                                                           htmlFor={`payment_option_${i}`}>
                                                                        <img src={useInternalLink(row?.image)}
                                                                             style={{width: "90px", padding: "20px", aspectRatio: "1.5/1"}}
                                                                             alt={row?.name}/>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="btn btn-success btn-block mb-4 d-lg-block d-none" type="submit"
                                                        disabled={processing}>
                                                    Continue To Payment
                                                </Button>
                                            </form>
                                        </>
                                        :
                                        <div className="col-md-7">
                                            <div className="heading_s11 text-center" style={{marginTop: '20%'}}>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div style={{
                                                        backgroundColor: '#2FD35E',
                                                        borderRadius: '50',
                                                        width: '50px',
                                                        height: '50px'
                                                    }}>
                                                        <img style={{paddingLeft: '5px', paddingTop: '15px'}}
                                                             src={checkIcon} alt=""/>
                                                    </div>

                                                    <h4 style={{paddingTop: '10px', fontSize: '35px'}}>Thank You For
                                                        Your Purchase!</h4>
                                                </div>
                                                <p className="p-2 m-0">Your Order Number is <b>{invoice?.invoice}</b>
                                                </p>
                                                <p className="p-0 m-0">Payment Method
                                                    : <b>{invoice?.customer_payment?.payment_type_setting
                                                        ?.name}</b></p>
                                                <p className="p-0">To track the Delivery of your order go to </p>

                                                <Link className="btn btn-success btn-sm mr-2 mb-2"
                                                      href={route('user.dashboard')}>
                                                    <i className="las la-plus"></i> &nbsp; View Order
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className="col-md-5">
                                    <div className="order_review">
                                        <div className="heading_s1">
                                            <h4>Order Summary</h4>
                                        </div>
                                        <hr/>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                {orders.length && orders.map((row, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            <img
                                                                src={useInternalLink(row?.product?.product_image?.product_image)}
                                                                style={{width: "90px", aspectRatio: "1/1.5"}}/>
                                                        </td>
                                                        <td>
                                                            <div style={{marginTop: "5%", paddingLeft: "20px"}}>
                                                                <strong>{ucwords(row?.product?.name)}</strong>
                                                                <p>
                                                                    {row?.color && <>
                                                                        <span>Color:</span>
                                                                        <span className="m-1">
                                                                            <b>{ucwords(row?.color)}</b>
                                                                        </span>
                                                                    </>}

                                                                    {row?.size && <>
                                                                        <span>Size:</span>
                                                                        <span className="m-1">
                                                                            <b>{ucwords(row?.size)}</b>
                                                                        </span>
                                                                    </>}

                                                                    <>
                                                                        <span>Price:</span>
                                                                        <span className="m-1">
                                                                            <b>{row?.quantity} X ৳{row?.sale_price}</b>
                                                                        </span>
                                                                    </>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                                <tfoot>
                                                <tr>
                                                    <th>SubTotal</th>
                                                    <td className="product-subtotal">৳ {invoice?.invoice_amount}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>{invoice?.shipping_charge}</td>
                                                </tr>
                                                <tr>
                                                    <th>Grant Total</th>
                                                    <td className="product-subtotal">৳ {parseInt(invoice?.invoice_amount) + parseInt(invoice?.shipping_charge)}</td>
                                                </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProcessBtn fromSubmit={submit}/>
            </GuestLayout>
        </>
    );
}
