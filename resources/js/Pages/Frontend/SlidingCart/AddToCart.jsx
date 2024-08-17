import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    deleteData,
    getAllData,
    postAllCheck,
    postCouponData,
    postData, removeCoupon,
    updateData
} from "@/Pages/reducers/addCardSlice";
import {getRecentProduct} from "@/Pages/reducers/recentProduct";
import {ucwords, uid, useInternalLink} from "@/Library/Helper";
import Style from './AddToCart.module.css';
import {Link, usePage} from "@inertiajs/react";
import {Col, Container, Row} from "react-bootstrap";
import {route} from "ziggy-js";
import {IoCloseOutline} from "react-icons/io5";
import CartItem from "@/Pages/Frontend/SlidingCart/CartItem.jsx";
import Slider from "react-slick";


export default function AddToCart({isAble, toggleMCart, toggleCoupon}) {
    const dispatch = useDispatch();
    const {addCard, coupons,setCoupon} = useSelector((state) => state.addCard);
    // const {products} = useSelector((state) => state.recentProduct);

    const [updatedCart, setUpdatedCart] = useState([]);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalRegularPrice, setTotalRegularPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [selectAll, setSelectAll] = useState(true);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);

    // console.log(setCoupon);

    const couponDiscountManage = ()=>{
        if (coupons) {
            if (coupons?.type === "coupon"){
                const totalSale = updatedCart.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
                const amount = totalSale * coupons?.coupon_percent / 100;
                setCouponAmount(amount);
            } else { // affiliate commission manage
                const totalAffiliate = updatedCart.reduce((acc, item) => {
                    const affiliatePercent = (item.product.affiliate_percent);
                    return affiliatePercent ? acc + (item.product.sale_price * item.quantity * affiliatePercent / 100) : acc;
                }, 0);
                setCouponAmount(totalAffiliate);
            }
        }
    }

    const cardUpdatePost = (updatedItem, index) => {
        const data = {
            cardData: updatedItem,
            index: index
        }
        dispatch(updateData(data))
            .unwrap()
            .then((response) => {
                couponDiscountManage()
                // console.log('Product added to cart successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    }

    const cartDeleteHandle = (row, index) => {
        const itemToUpdate = updatedCart[index];
        const data = {
            cardData: itemToUpdate
        };
        dispatch(deleteData(data))
            .unwrap()
            .then((response) => {
                // console.log('Product deleted from cart successfully:', response);
                const newCart = [...updatedCart];
                newCart.splice(index, 1);
                if(!newCart.length) {
                    toggleMCart()
                }
                setUpdatedCart(newCart);
                couponDiscountManage()
            })
            .catch((error) => {
                console.error('Error deleting product from cart:', error);
            });
    };

    const handleUpdateQuantity = (index, quantity) => {
        if (index >= 0 && index < updatedCart.length) {
            const itemToUpdate = updatedCart[index];
            const updatedItem = {
                ...itemToUpdate,
                quantity
            };
            const newCart = [...updatedCart.slice(0, index), updatedItem, ...updatedCart.slice(index + 1)];
            cardUpdatePost(updatedItem, index)
            setUpdatedCart(newCart);
        } else {
            console.error("Invalid index provided:", index);
        }
    };

    const handleColorChange = (index, event) => {
        event.preventDefault();
        if (index >= 0 && index < updatedCart.length) {
            const itemToUpdate = updatedCart[index];
            const updatedItem = {
                ...itemToUpdate,
                color: event.target.value
            };
            const newCart = [...updatedCart.slice(0, index), updatedItem, ...updatedCart.slice(index + 1)];
            cardUpdatePost(updatedItem, index)
            setUpdatedCart(newCart, event);
        } else {
            console.error("Invalid index provided:", index);
        }
    };

    const handleSizeChange = (index, event) => {
        event.preventDefault();
        if (index >= 0 && index < updatedCart.length) {
            const itemToUpdate = updatedCart[index];
            const updatedItem = {
                ...itemToUpdate,
                size: event.target.value
            };
            const newCart = [...updatedCart.slice(0, index), updatedItem, ...updatedCart.slice(index + 1)];
            cardUpdatePost(updatedItem, index)
            setUpdatedCart(newCart);
        } else {
            console.error("Invalid index provided:", index);
        }
    };

    const colorHandle = (row, index) => {
        const colorsString = row?.product.colors;
        if (colorsString) {
            const colorsArray = colorsString.split(",");
            return (
                <select name="color" id="color" onChange={(e) => handleColorChange(index, e)} value={row.color || ""}>
                    {colorsArray.map((item, colorIndex) => (
                        <option key={colorIndex} value={item}>{ucwords(item)}</option>
                    ))}
                </select>
            );
        }
        return (
            <select name="color" id="color" onChange={(e) => handleColorChange(index, e)} value={row.color || ""}>
                <option value="">No color available</option>
            </select>
        );
    };

    const sizeHandle = (row, index) => {
        const sizesString = row?.product.size;
        if (sizesString) {
            const sizesArray = sizesString.split(",");
            return (
                <select name="size" id="size" onChange={(e) => handleSizeChange(index, e)} value={row.size || ""}>
                    <option value="" disabled={row.size ? null : true}>Select</option>
                    {sizesArray.map((item, sizeIndex) => (
                        <option key={sizeIndex} value={item}>{ucwords(item)}</option>
                    ))}
                </select>
            );
        }
        return (
            <select name="size" id="size" onChange={(e) => handleSizeChange(index, e)} value={row.size || ""}>
                <option value="">No size available</option>
            </select>
        );
    };

    const handleSelectChange = (index, event) => {
        event.preventDefault();
        const isChecked = event.target.checked;
        if (index >= 0 && index < updatedCart.length) {
            const itemToUpdate = updatedCart[index];
            const updatedItem = {
                ...itemToUpdate,
                selected: event.target.checked
            };
            const newCart = [...updatedCart.slice(0, index), updatedItem, ...updatedCart.slice(index + 1)];
            cardUpdatePost(updatedItem,index)
            setUpdatedCart(newCart);
            if (!isChecked) {
                setSelectAll(false);
            } else {
                const allSelected = newCart.every(item => item.selected);
                setSelectAll(allSelected);
            }
        } else {
            console.error("Invalid index provided:", index);
        }
    };

    const cardCheckUnCheck = (checkItem, event) => {
        event.preventDefault();
        const data = {
            cardData: checkItem
        }
        dispatch(postAllCheck(data))
            .unwrap()
            .then((response) => {
                // console.log('Product added to cart successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    }

    const handleSelectAll = (event) => {
        event.preventDefault();
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        const newCart = updatedCart.map(item => ({
            ...item,
            selected: isChecked
        }));
        cardCheckUnCheck(isChecked, event)
        setUpdatedCart(newCart);
    };

    const removeCouponHandle =()=>{
        dispatch(removeCoupon())
            .unwrap()
            .then((response) => {
                // console.log('Product added to cart successfully:', response);
                couponDiscountManage()
                setAppliedCoupon(null)
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    }

    useEffect(() => {
        if (coupons){
            setAppliedCoupon(coupons?.title)
            if (coupons?.type==="coupon"){
                const totalSale = updatedCart.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
                const amount = totalSale * coupons?.coupon_percent / 100
                setCouponAmount(amount)
            }else{//affiliate commotion manage
                const totalAffiliate = updatedCart.reduce((acc, item) => {
                    const affiliatePercent = (item.product.affiliate_percent);
                    return affiliatePercent ? acc + (item.product.sale_price * item.quantity * affiliatePercent / 100) : acc;
                }, 0);
                setCouponAmount(totalAffiliate)
            }
        }
    }, [coupons,updatedCart]);

    useEffect(() => {
        // dispatch(getRecentProduct());
        dispatch(getAllData());
    }, [dispatch]);

    useEffect(() => {
        if (addCard?.length) {
            setUpdatedCart(addCard);
            couponDiscountManage();
        }
    }, [addCard]);

    useEffect(() => {
        const totalSale = updatedCart.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
        const totalRegularSale = updatedCart.reduce((acc, item) => item.selected ? acc + (item.product.regular_price * item.quantity) : acc, 0);
        setTotalSalePrice(totalSale);
        setTotalRegularPrice(totalRegularSale);
        setTotalDiscount(totalRegularSale - totalSale);

        updatedCart.map((item, idx) => {
            if (item.selected === false) {
                setSelectAll(false);
            } else {
                setSelectAll(true);
            }
        });
        couponDiscountManage()
    }, [updatedCart]);

    return (
        <Row className={Style.sliderCartBody}>
            <Col className="col-12">
                {updatedCart && updatedCart.map((row, index) => (
                    <CartItem
                        key={uid()}
                        image={useInternalLink(row.product_image)}
                        name={row.name}
                        color={colorHandle(row, index)}
                        size={sizeHandle(row, index)}
                        price={row.product.sale_price}
                        quantity={row.quantity}
                        selected={row.selected}
                        onUpdateQuantity={(quantity) => handleUpdateQuantity(index, quantity)}
                        onRemoveCart={(row) => cartDeleteHandle(row, index)}
                        onCheckCart={(e) => handleSelectChange(index, e)}
                    />
                ))}

                <Row className={Style.couponSection}>
                    <Col className="col-7">
                        {appliedCoupon ? (
                            <>
                            <span>Applied Coupon</span>
                                <button className={Style.closeCart} style={{ width:'fit-content'}} onClick={()=>removeCouponHandle()}>{appliedCoupon} <IoCloseOutline className={Style.closeCartIcon}/></button>
                            </>
                        ) : (
                            <span>Have a Coupon Code?</span>
                        )}
                    </Col>
                    <Col className="col-5">
                        <button onClick={toggleCoupon}>
                            {appliedCoupon ? "Change Coupons" : "View/Apply Coupon"}
                        </button>

                    </Col>
                </Row>
            </Col>

            <Col className="col-12">
                <Container className={Style.paymentDetailsSec}>
                    <h6 className={Style.paymentDetailsSecTitle}>Payment Details</h6>
                    <Row>
                        <Col className={`col-5 ${Style.paymentDetailsSecItem}`}>Sub total</Col>
                        <Col
                            className={`col-7 ${Style.paymentDetailsSecItem} ${Style.paymentPrice}`}>৳{totalRegularPrice}</Col>

                        <Col className={`col-5 ${Style.paymentDetailsSecItem}`}>Flat Discount</Col>
                        <Col className={`col-7 ${Style.paymentDetailsSecItem} ${Style.paymentPrice}`}>৳{totalDiscount}</Col>

                        <Col className={`col-5 ${Style.paymentDetailsSecItem}`}>Coupon Discount</Col>
                        <Col className={`col-7 ${Style.paymentDetailsSecItem} ${Style.paymentPrice}`}>৳{couponAmount?couponAmount:0}</Col>

                        <Col className={`col-5 ${Style.paymentDetailsSecItem}`}>Shipping Charge</Col>
                        <Col className={`col-7 ${Style.paymentDetailsSecItem} ${Style.paymentPriceUndefined}`}>To be
                            Calculated in Checkout Page</Col>

                        <Col className={`col-5 ${Style.paymentDetailsSecItem}`}>Grant Total</Col>
                        <Col
                            className={`col-7 ${Style.paymentDetailsSecItem} ${Style.paymentPrice}`}>৳{totalSalePrice - couponAmount}</Col>
                    </Row>
                </Container>
            </Col>

            <Col className="col-12">
                {/*<Slider products={products}/>*/}
            </Col>

            <Col className={`col-12 ${Style.cartBottom} ${isAble && Style.dFlex}`}>
                <labe className={Style.inputLabel}>
                    <input
                        className={Style.cartInput}
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => handleSelectAll(e)}
                    />
                    <span>All</span>
                </labe>

                <span className={Style.bottomPaymentPrice}>Subtotal :  <span>৳ {totalSalePrice - couponAmount}</span></span>


                {updatedCart.length ?

                    <Link className={Style.bottomPaymentBtn} href={route('product.checkout')}>
                        CheckOut Now
                    </Link>
                    :""
                }
            </Col>
        </Row>
    );
}
