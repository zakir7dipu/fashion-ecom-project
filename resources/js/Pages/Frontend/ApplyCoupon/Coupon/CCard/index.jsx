import React, { useEffect, useState } from 'react';
import Style from "./CCard.module.css";
import { Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { postCouponData } from "@/Pages/reducers/addCardSlice";

function Index({ info }) {
    const dispatch = useDispatch();
    const { addCard } = useSelector((state) => state.addCard);
    const {id, coupon_name, coupon_percent, details, order_amount } = info;
    const [totalSalePrice, setTotalSalePrice] = useState(0);

    useEffect(() => {
        if (addCard?.length){
            const totalSale = addCard.reduce((acc, item) => item.selected ? acc + (item.product.sale_price * item.quantity) : acc, 0);
            setTotalSalePrice(totalSale);
        }
    }, [addCard]);


    const handleApplyCoupon = () => {
        dispatch(postCouponData(info))
            .unwrap()
            .then((response) => {
                // console.log('Product added to cart successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };

    const isDisabled = totalSalePrice <= order_amount;

    return (
        <Card className={`rounded-0 ${Style.cCard}`}>
            <Card.Body className="row">
                <Col className="col-7">
                    <span className={Style.title}>{coupon_name}</span>
                    <span className={Style.subTitle}>{coupon_percent}% Off</span>
                </Col>
                <Col className="col-5">
                    <button
                        type="button"
                        className={Style.cApplyBtn}
                        onClick={handleApplyCoupon}
                        disabled={isDisabled}
                    >
                        Apply Coupon
                    </button>
                </Col>
                <Col className="col-12">
                    <p className={Style.details}>{details}</p>
                </Col>
            </Card.Body>
        </Card>
    );
}

export default Index;
