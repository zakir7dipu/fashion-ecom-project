import React from 'react';

import Style from "./SlidingCart.module.css";
import {IoCloseOutline} from "react-icons/io5";
import {Container} from "react-bootstrap";
import AddToCart from "@/Pages/Frontend/SlidingCart/AddToCart.jsx";


const Index = ({ isOpen, toggleCart, toggleCouponCart }) => {
    return (
        <Container className={`${Style.slidingCart} ${isOpen ? Style.open : ''} p-3`}>
            <div className={`${Style.cartHeader}`}>
                <span className={`${Style.cartHeaderTitle}`}>My Cart</span>
                <button onClick={toggleCart} className={`${Style.closeCart} text-danger`}> <IoCloseOutline/></button>
            </div>
            <AddToCart isAble={isOpen} toggleMCart={toggleCart} toggleCoupon={toggleCouponCart}/>
        </Container>
    );
};

export default Index;
