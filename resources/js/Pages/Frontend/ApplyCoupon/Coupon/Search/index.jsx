import React, {createRef, useEffect} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import Style from "./Search.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getAllCoupon, getAllUsers} from "@/Pages/reducers/addCouponSlice";
import {postCouponAffiliate, postCouponData} from "@/Pages/reducers/addCardSlice";

function Index(props) {
    const couponInputRef = createRef();
    const dispatch = useDispatch();
    const { affiliateUser } = useSelector((state) => state.addCoupon);

// console.log(affiliateUser);


    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);


    const getInputCoupon = (e) => {
        e.preventDefault()
        let coupon = couponInputRef.current.value;
        const couponMatch = affiliateUser.filter((type) => type.slug === coupon)

        dispatch(postCouponAffiliate(couponMatch[0]))
            .unwrap()
            .then((response) => {
                // couponInputRef.current.value = '';
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    }

    return (
        <Col className="col-12 mb-4">
            <Form className="row g-1" onSubmit={getInputCoupon}>
                <Col className="col-9">
                    <input
                        ref={couponInputRef}
                        type="text"
                        className={Style.inputCoupon}
                        placeholder="Enter a Coupon Code"
                    />
                </Col>
                <Col className="col-3">
                    <button
                        type="submit"
                        className={Style.ApplyBtn}
                    >Apply</button>
                </Col>
            </Form>
        </Col>
    );
}

export default Index;
