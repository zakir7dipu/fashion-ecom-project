import React, {useState} from 'react';
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import {Head, Link, usePage} from "@inertiajs/react";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import wish from '../../../../../home_asset/common/Image.png'
import cart from '../../../../../home_asset/common/01.png'
import {Col, Container, Row} from "react-bootstrap";
import {route} from "ziggy-js";
import Style from "./Dashboard.module.css"
import Card from "react-bootstrap/Card";
import {FaRegHeart} from "react-icons/fa";
import {LuShoppingCart} from "react-icons/lu";
// import ShoppingCartIcon from "@/Library/CustomIconLibrary/ShoppingCartIcon.jsx";
// import WishlistIcon from "@/Library/CustomIconLibrary/WishlistIcon.jsx";

export default function Index (){
    const {auth} = usePage().props
    const users = auth.user

    const [isLoading,setIsLoading] = useState(false);

    return (
        <UserAuthLayout>
            <Head title={`${users?.name} Dashboard`} />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            <Container>
                <Row className="g-4">
                    <p className={Style.welcomeNotification}> Good Afternoon! <Link href={route("user.dashboard")}> {users?.name}</Link></p>

                    <Col lg={6}>
                        <Card className={Style.card}>
                            <Card.Img variant="top" src={wish} />
                            <Card.Body className={Style.cardBody}>
                                <div className={Style.cardIcon}>
                                    <a href={route('customer.orders')}>
                                        <LuShoppingCart
                                            fontSize={`50px`}
                                            color="#1A1A1A"
                                        />
                                    </a>
                                </div>
                                <Card.Title className={Style.cardTitle}>My Order</Card.Title>
                                <Card.Text className={Style.cardText}>All your ordered items here</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col lg={6}>
                        <Card className={Style.card}>
                            <Card.Img variant="top" src={cart} />
                            <Card.Body className={Style.cardBody}>
                                <div className={Style.cardIcon}>
                                    <a href={route('wish.index')}>
                                        <FaRegHeart
                                            fontSize="50px"
                                            color="#1A1A1A"
                                        />
                                    </a>
                                </div>
                                <Card.Title className={Style.cardTitle}>Wishlist</Card.Title>
                                <Card.Text className={Style.cardText}>All your save items in one placed</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </UserAuthLayout>
    );
}
