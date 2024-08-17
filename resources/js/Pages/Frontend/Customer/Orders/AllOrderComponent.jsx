import React, {Suspense, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Style from "./Order.module.css";
import {ucwords, uid, useInternalLink} from "@/Library/Helper";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

const OrderImage = ({srcUrl}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = srcUrl
        img.onload = () => {
            setLoading(false);
        };
    }, [srcUrl]);

    return (
        <>
            {loading ? (
                <Skeleton className={Style.orderedProductImage} style={{aspectRatio: '1/1.5'}}/>
            ) : (
                <Suspense fallback={<Skeleton className={Style.orderedProductImage} style={{aspectRatio: '1/1.5'}}/>}>
                    <img src={srcUrl} alt="" className={Style.orderedProductImage}/>
                </Suspense>
            )}
        </>
    )
}

const statusHandle = (status, parcel_shipping_details) => {
    if (status === "1") {
        return (
            <>
                <button className={Style.orderedProductNopayBtn} type="button">No payment</button>
            </>
        )
    } else if (status === "2") {
        return (
            <>
                <button className={Style.orderedProductDeliveryBtn} type="button"> Processing</button>
            </>
        )
    } else if (status === "3") {
        return (
            <>
                <button className={Style.orderedProductDeliveryBtn} type="button"> Delivery</button>
                <br/>
                <h6 className={`${Style.orderedProductDeliveryInfo} order-1 order-lg-2`}> {parcel_shipping_details}</h6>
            </>
        )
    } else if (status === "4") {
        return (
            <>
                <button className={Style.orderedProductDeliveryBtn} type="button"> Success</button>
            </>
        )
    } else {
        return (
            <>
                <button className={Style.orderedProductDeliveryBtn} type="button"> Returned</button>
            </>
        )
    }
}

export default function AllOrderComponent({orderInvoices}) {

    return (
        <>
            <Row className="g-2 mb-3">
                <Col lg={12}>
                    {orderInvoices && orderInvoices.map((orderItem, i) => {
                        const {invoice, created_at, orders, delivery_date, parcel_shipping_details, status} = orderItem;
                        return (
                            <Card className={Style.orderItemCard} key={uid()} style={{marginBottom: '10px'}}>
                                <Card.Header>
                                    <Row>
                                        <Col lg={6} className="col-8">
                                            <p className={Style.orderItemCardTitle}>Order <span>#{invoice}</span></p>
                                            <p className={Style.orderItemCardSubTitle}>Placed
                                                on {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                        </Col>
                                        <Col lg={6} className="col-4">
                                            <button type="button" className={Style.orderItemCardBtn}
                                            >manage
                                            </button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className={Style.cardBody}>
                                    {orders.map((order, i) => {
                                        const {product} = order;
                                        return (
                                            <Card.Body className={Style.cardBody} key={i}>
                                                <Row>
                                                    <Col lg={6} className={Style.orderedProductWrapper}>
                                                        <OrderImage srcUrl={useInternalLink(product?.product_image?.product_image_small)}/>
                                                        <div className={Style.orderedProductInfo}>
                                                            {product?.name ? <h6 className={Style.orderedProductName}>{ucwords(product?.name)}</h6>: <Skeleton
                                                                width="150px"
                                                                height="20px"
                                                                className="mb-3"
                                                            />}

                                                            <span className={Style.orderedProductAttributes}>
                                                        {order?.color &&
                                                            <span>Color: <span>{ucwords(order?.color)}</span></span>}
                                                                {order?.size &&
                                                                    <span>Size: <span>{ucwords(order?.size)}</span></span>}
                                                                <span>Price: &nbsp;
                                                                    <span>{order?.quantity} &nbsp; X &nbsp;
                                                                        <span>৳ {order?.sale_price}</span></span></span>
                                                    </span>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6} className={Style.orderedProductDelivery}>
                                                        <div className="order-2 order-lg-1">
                                                            {statusHandle(status, parcel_shipping_details)}
                                                        </div>

                                                        <h6 className={`${Style.orderedProductDeliveryInfo} order-1 order-lg-2`}> {delivery_date ? "Delivered on " + delivery_date : ""}</h6>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Col>
            </Row>
        </>
    );
}

