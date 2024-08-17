import React, {useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import {Head, Link, usePage} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Col, Container, Row} from "react-bootstrap";
import {route} from "ziggy-js";
import Style from "./Affiliate.module.css"
import Card from "react-bootstrap/Card";

export default function Index ({affiliate,earnings}){

    const [isLoading,setIsLoading] = useState(false);

    const {customer} = affiliate


    return (
        <UserAuthLayout>
            <Head title={"Affiliate Program"} />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container>
                <Row className="g-4">
                    <Col lg={6}>
                        <Card className={Style.card}>
                            <Card.Body className={Style.cardBody}>
                                <Card.Title className={Style.cardTitle}>Affiliate ID</Card.Title>
                                <Card.Title className={Style.cardTitleID}>{customer?.slug?"ID : "+customer?.slug:"ID : Please buy any product"}</Card.Title>

                            </Card.Body>
                        </Card>
                    </Col>


                    <Col lg={6}>
                        <Card className={Style.card}>
                            <Card.Body className={Style.cardBody}>
                                <Card.Title className={Style.cardTitle}>Affiliate Earning</Card.Title>
                                <Card.Title className={Style.cardTitleID}>Total Earning: {customer?.affiliate_amount?customer?.affiliate_amount:"0"}</Card.Title>
                                <Card.Title className={Style.cardTitleID}>Earning Use: {customer?.affiliate_amount_used?customer?.affiliate_amount_used:"0"}</Card.Title>
                                <Card.Title className={Style.cardTitleID}>Earning Balance: {customer?.affiliate_amount_blanch?customer?.affiliate_amount_blanch:"0"}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
