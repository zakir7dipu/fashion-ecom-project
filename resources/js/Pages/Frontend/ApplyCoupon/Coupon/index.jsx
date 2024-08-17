import React, { useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import Search from "@/Pages/Frontend/ApplyCoupon/Coupon/Search/index.jsx";
import Style from "./Coupon.module.css";
import CCard from "@/Pages/Frontend/ApplyCoupon/Coupon/CCard/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {getAllCoupon} from "@/Pages/reducers/addCouponSlice";


function Index() {
    const dispatch = useDispatch();
    const { allCoupon } = useSelector((state) => state.addCoupon);

    useEffect(() => {
        dispatch(getAllCoupon());
    }, [dispatch]);

    return (
        <Row>
            <Search />
            <h5 className={Style.sectionTitle}>Available Coupons</h5>
            <Col className="col-12">
                {allCoupon.map(item => (
                    <CCard key={item.id} info={item}/>
                ))}
            </Col>
        </Row>
    );
}

export default Index;
