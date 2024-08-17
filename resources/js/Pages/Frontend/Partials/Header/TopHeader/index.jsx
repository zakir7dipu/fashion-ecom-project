import React from 'react';
import Style from "./TopHeader.module.css";
import {Col, Container, Row} from "react-bootstrap";
import {route} from "ziggy-js";

function Index(props) {
    return (
        <div className={Style.topHeader}>
            <ul className={Style.contactDetail}>
                <li><span>50% offer for New Products</span></li>
                <li><a href={route('shop.product_discount')} className="Shop">Shop Now</a></li>
            </ul>
        </div>
    );
}

export default Index;
