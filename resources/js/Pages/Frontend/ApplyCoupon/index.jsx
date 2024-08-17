import React from 'react';
import {Container} from "react-bootstrap";
import Style from "./ApplyCoupon.module.css";
import {FaArrowLeftLong} from "react-icons/fa6";
import Coupon from "@/Pages/Frontend/ApplyCoupon/Coupon/index.jsx";

function Index({ isCouponOpen, toggleCouponCart }) {
    return (
        <Container className={`${Style.applyCoupon} ${isCouponOpen ? Style.open : ''} p-3`}>
            <div className={`${Style.cartHeader}`}>
                <button onClick={toggleCouponCart} className={`${Style.closeCart}`}> <FaArrowLeftLong /></button>
                <span className={`${Style.cartHeaderTitle}`}>Apply Coupon</span>
            </div>
            <Coupon/>
        </Container>
    );
}

export default Index;
