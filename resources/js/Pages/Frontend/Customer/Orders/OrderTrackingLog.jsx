import React, { useState } from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import { Head } from "@inertiajs/react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import {Container, Row } from "react-bootstrap";
import Style from "./OrderTracking.module.css";
import Card from "react-bootstrap/Card";
import AllOrderComponent from "@/Pages/Frontend/Customer/Orders/AllOrderComponent";

export default function OrderTrackingLog({ orders }) {
    const [isLoading, setIsLoading] = useState(false);


    return (
        <UserAuthLayout>
            <Head title="Customer Order Delivery Details" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container className="mb-5">
                <Row className="g-4">
                    <Card.Title className={Style.cardTitleAddress}>Delivery Details</Card.Title>

                    <p>Delivery Details chard</p>

                    <AllOrderComponent orderInvoices={orders}/>
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
