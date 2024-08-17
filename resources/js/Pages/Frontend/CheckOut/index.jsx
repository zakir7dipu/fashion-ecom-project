import React, {useEffect, useState} from 'react';
import {Head, useForm, usePage} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {useDispatch, useSelector} from "react-redux";
import {getAllData} from "@/Pages/reducers/addCardSlice";
import BdDistrict from "@/Components/BdDistrict";
import {InputFormWithoutLabel} from "@/Components/FormShare/InputFormWithoutLabel";
import {successMessage, warningMessage, inertiaErrorMessage, useInternalLink, ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import ProcessBtn from "@/Pages/Frontend/BottomNav/ProcessBtn.jsx";

const Style = {
    formCheckInput: {
        marginRight: "10px",
        marginTop: "10px"
    }
}

export default function Index({customers}) {
    const {auth} = usePage().props

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {addCard, setCoupon} = useSelector((state) => state.addCard);
    const [selectOffice, setSelectOffice] = useState('Home');
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(0);
    const [grandSalePrice, setGrandSalePrice] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);

    const districtOptions = BdDistrict();

    const {data, setData, errors, post, reset, processing} = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        district: "",
        post_code: "",
        delivery: "",
        note: "",
        condition: "",
        shipping_charge: "",
        invoice_amount: "",
        affiliate_amount: '0',
        cartArray: '',
        totalRegluerPrice: '',
        totalSalePrice: '',
        totalDiscount: '',
        coupon: '',
        couponType: '',
        couponAmount: '',
        coupon_id: ''
    });


    const submit = (e) => {
        e.preventDefault();
        if (data.phone) {
            if (data.condition === true) {
                post(route('product_checkout.order'), {
                    onStart: () => setIsLoading(true),
                    onSuccess: () => {
                        setIsLoading(false);
                        successMessage("Checkout Save Success Continue To Payment");
                        reset();
                    },
                    onError: (err) => {
                        inertiaErrorMessage(err);
                        setIsLoading(false);
                    }
                });
            } else {
                warningMessage("Please check I agree to Terms & Conditions ");
            }
        } else {
            warningMessage("Please Enter 11 Digit Mobile No ");
        }
    };

    const distChangeHandle = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setData('district', selectedOption.value);
        const dist = selectedOption.value;
        const totalShippingCharge = addCard.reduce((acc, item) => item.selected ? acc + (dist === "Dhaka" ? item.product.shipping.in_dhaka : item.product.shipping.out_dhaka) : acc, 0);
        setData(data => ({...data, shipping_charge: totalShippingCharge}));
        setShippingCharge(totalShippingCharge);
        setGrandSalePrice(totalSalePrice + totalShippingCharge);
    };

    const handleMobileNo = (e) => {
        const limit = 11;
        const value = e.target.value.slice(0, limit);
        if (e.target.value.length > limit) {
            warningMessage("Please Enter 11 Digit Mobile No ");
        }
        setData('phone', value);
    };

    const handleOptionChange = (e) => {
        setSelectOffice(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setData(data => ({...data, condition: e.target.checked}));
    };

    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);

    useEffect(() => {
        setData(data => ({...data, name: customers?.name}));
        setData(data => ({...data, email: customers?.email}));
        setData(data => ({...data, phone: customers?.phone}));
        setData(data => ({...data, address: customers?.customer?.address}));
        setData(data => ({...data, district: customers?.customer?.district}));
        setData(data => ({...data, post_code: customers?.customer?.post_code}));
    }, [customers]);

    useEffect(() => {
        setData(data => ({...data, delivery: selectOffice}));
    }, [selectOffice]);

    useEffect(() => {
        const totalSale = addCard.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
        const totalRegularSale = addCard.reduce((acc, item) => item.selected ? acc + (item.product.regular_price * item.quantity) : acc, 0);
        const totalShippingCharge = addCard.reduce((acc, item) => item.selected ? acc + (item.product.shipping.in_dhaka) : acc, 0);
        setTotalSalePrice(totalSale);
        const discount = totalRegularSale - totalSale
        const totalSaleLaseCoupon = totalSale - couponAmount
        setData(data => ({
            ...data,
            invoice_amount: totalSaleLaseCoupon,
            shipping_charge: totalShippingCharge,
            cartArray: addCard,
            totalRegluerPrice: totalRegularSale,
            totalSalePrice: totalSale,
            totalDiscount: discount,
            district: "Dhaka"
        }));
        setShippingCharge(totalShippingCharge);
        setGrandSalePrice(totalSale + totalShippingCharge);
        setSelectedDistrict({label: 'Dhaka', value: 'Dhaka'})
    }, [addCard]);

    useEffect(() => {
        if (setCoupon) {
            setData(data => ({...data, coupon_id: setCoupon?.coupon_id}));
            setData(data => ({...data, coupon: setCoupon?.title}));
            setData(data => ({...data, couponType: setCoupon?.type}));
            if (setCoupon?.type === "coupon") {
                const totalSale = addCard.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
                const amount = totalSale * setCoupon?.coupon_percent / 100
                setCouponAmount(amount)
                setData(data => ({...data, couponAmount: amount}));
                setData(data => ({...data, affiliate_amount: 0}));
            } else {//affiliate commotion manage
                const totalAffiliate = addCard.reduce((acc, item) => {
                    const affiliatePercent = (item.product.affiliate_percent);
                    return affiliatePercent ? acc + (item.product.sale_price * item.quantity * affiliatePercent / 100) : acc;
                }, 0);
                setData(data => ({...data, affiliate_amount: totalAffiliate}));
                setData(data => ({...data, couponAmount: 0}));
                setCouponAmount(totalAffiliate)
            }
        }
    }, [setCoupon, addCard]);

    return (
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
                                <h2 className="text-center mb-3">Checkout info</h2>
                                <div className="heading_s1">
                                    <h4>Contact Info</h4>
                                </div>
                                <form onSubmit={submit} encType="multipart/form-data">
                                    <div className="row">
                                        <InputFormWithoutLabel
                                            col_name="col-md-12"
                                            className="text-danger ml-1"
                                            type="text"
                                            label="Full Name(নাম) *"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error={errors?.name}
                                            required={true}
                                        />
                                        <InputFormWithoutLabel
                                            col_name="col-md-6"
                                            className="text-danger ml-1"
                                            type="email"
                                            label="Email(ইমেইল)Optional"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={errors?.email}
                                        />
                                        <InputFormWithoutLabel
                                            col_name="col-md-6"
                                            className="text-danger ml-1"
                                            type="number"
                                            label="Phone Number(ফোন নম্বর) *"
                                            name="phone"
                                            maxLength={11}
                                            onChange={(e) => handleMobileNo(e)} value={data.phone}
                                            error={errors?.phone}
                                            required={true}
                                        />
                                        <div className="heading_s1">
                                            <h4>Shipping Info</h4>
                                        </div>
                                        <InputFormWithoutLabel
                                            col_name="col-md-12"
                                            className="text-danger ml-1"
                                            type="text"
                                            label="Detailed Address(বিস্তারিত ঠিকানা) *"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            error={errors?.address}
                                            required={true}
                                        />
                                        <div className="col-md-6 mb-3">
                                            <div className="dropdown-container">
                                                <Select
                                                    id="district"
                                                    name="district"
                                                    options={districtOptions}
                                                    value={selectedDistrict}
                                                    placeholder="Select District(জেলা)"
                                                    onChange={distChangeHandle}
                                                />
                                                {errors && <InputError message={errors?.district}/>}
                                            </div>
                                        </div>
                                        <InputFormWithoutLabel
                                            col_name="col-md-6"
                                            className="text-danger ml-1"
                                            type="number"
                                            label="Post Code(পোস্ট কোড)Optional"
                                            name="post_code"
                                            value={data.post_code}
                                            onChange={(e) => setData('post_code', e.target.value)}
                                            error={errors?.post_code}/>
                                    </div>

                                    <div className="ship_detail">
                                        <div className="form-group mb-3">
                                            <div className="chek-form">
                                                Select a label for effective delivery:
                                                <div className="custome-radio">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            style={Style.formCheckInput}
                                                            type="radio"
                                                            name="officeOptions"
                                                            value="Home"
                                                            checked={selectOffice === 'Home'}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label style={Style.formCheckInput}
                                                               htmlFor="inlineCheckbox1">Home</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            style={Style.formCheckInput}
                                                            type="radio"
                                                            name="officeOptions"
                                                            value="Office"
                                                            checked={selectOffice === 'Office'}
                                                            onChange={handleOptionChange}
                                                        />
                                                        <label style={Style.formCheckInput}
                                                               htmlFor="inlineCheckbox2">Office</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <textarea className="form-control" aria-label="With textarea"
                                                  style={{height: 80}} placeholder="Note(চিরকুট)Optional" id="note"
                                                  onChange={(e) => setData('note', e.target.value)}
                                                  value={data.note}></textarea>
                                        {errors && <InputError message={errors?.note}/>}
                                    </div>
                                    <p>You will get the delivery within 2-3 Days after confirmation. (নিশ্চিতকরণের 2-3
                                        দিনের মধ্যে আপনি ডেলিভারি পাবেন।)</p>
                                    <div className="custome-checkbox mb-4">
                                        <input
                                            style={Style.formCheckInput}
                                            type="checkbox"
                                            name="condition"
                                            id="condition"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="condition">
                                            <span>I agree to Terms & Conditions, Refund Policy and Privacy Policy of AM FASHION.</span>
                                        </label>
                                    </div>
                                    <Button
                                        variant="btn btn-success btn-block mb-4 d-lg-block d-none"
                                        type="submit"
                                        disabled={processing}>
                                        Continue To Payment
                                    </Button>
                                </form>
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
                                            {addCard && addCard.map((row, i) => (
                                                row.selected && (
                                                    <tr key={i}>
                                                        <td>
                                                            <img src={useInternalLink(row?.product_image)}
                                                                 style={{width: "90px", aspectRatio:"1/1.5"}}/>
                                                        </td>
                                                        <td>
                                                            <div style={{marginTop: "5%", paddingLeft: "20px"}}>
                                                                <strong>{ucwords(row?.name)}</strong>
                                                                <p>
                                                                    {row?.color && <>
                                                                        <span>Color:</span>
                                                                        <span
                                                                            className="m-1">
                                                                            <b>{ucwords(row?.color)}</b>
                                                                        </span>
                                                                    </>}

                                                                    {row?.size && <>
                                                                        <span>Size:</span>
                                                                        <span
                                                                            className="m-1">
                                                                            <b>{ucwords(row?.size)}</b>
                                                                        </span>
                                                                    </>}

                                                                    <>
                                                                        <span>Price:</span>
                                                                        <span
                                                                            className="m-1">
                                                                            <b>{row?.quantity} X ৳{row?.sale_price}</b>
                                                                        </span>
                                                                    </>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th>SubTotal</th>
                                                <td className="product-subtotal">৳ {totalSalePrice}</td>
                                            </tr>
                                            <tr>
                                                <th>Coupon Discount</th>
                                                <td>৳ {couponAmount}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>৳ {shippingCharge}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td className="product-subtotal">৳ {grandSalePrice - couponAmount}</td>
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
    );
}
