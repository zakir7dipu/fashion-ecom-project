import React, {useEffect, useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Col, Container, Form, Row } from "react-bootstrap";
import Style from "./OrderTracking.module.css";
import Card from "react-bootstrap/Card";
import SearchIcon from "@/Library/CustomIconLibrary/SearchIcon";
import Button from "react-bootstrap/Button";
import {successMessage, warningMessage} from "@/Library/Helper";

export default function OrderTracking({ orders }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [orderInvoices, setOrderInvoices] = useState([]);

    useEffect(() => {
        if (orders){
            const { customer } = orders;
            setOrderInvoices(customer?.order_invoices)
        }
    }, [orders]);

    const { get} = useForm({
    });

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const invoiceData = orderInvoices.filter((type) => type.invoice === searchTerm)
        if (invoiceData.length === 0) {
            warningMessage("No results found for the entered order code.");
        } else {
            console.log("Search results:", invoiceData);
            get(route('orders.tracking_log',searchTerm))
        }
    };

    return (
        <UserAuthLayout>
            <Head title="Customer Order Tracking" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container className="mb-5">
                <Row className="g-4">
                    <Card.Title className={Style.cardTitleAddress}>Track Your Order</Card.Title>
                    <Col lg={7} className={`${Style.menu}`}>
                        <Form inline="true" className={`${Style.searchForm} d-flex align-items-center`} onSubmit={handleSearchSubmit}>
                            <SearchIcon
                                width="19px"
                                height="19px"
                                fill="#BFBFBF"
                                className={Style.searchIcon}
                            />
                            <input
                                type="number"
                                name=""
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                placeholder="Enter Your Order Code"
                                aria-label="Search"
                                aria-describedby="SearchBar"
                                className={`form-control ${Style.search}`}
                            />
                            <Button type="submit" variant="success" className={Style.bottomPaymentBtn}>
                                Track My Order
                            </Button>
                        </Form>
                        <p className={Style.OrderText}>Order number can be found in the order confirmation email/sms you received.</p>
                    </Col>
                    <Col lg={5} className="col-4">
                    </Col>
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
