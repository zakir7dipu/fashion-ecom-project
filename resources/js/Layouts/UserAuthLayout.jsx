import React, {useEffect} from 'react';
import GuestLayout from "@/Layouts/GuestLayout";
import Footer from "@/Pages/Frontend/Partials/Footer/Footer";
import SideNav from "@/Pages/Frontend/Customer/Dashboard/SideNav/index.jsx";
import TopHeader from "@/Pages/Frontend/Partials/Header/TopHeader/index.jsx";
import MenuTop from "@/Pages/Frontend/Partials/Header/MenuTop/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesData, getCompanyData} from "@/Pages/reducers/CommonDataGetSlice";
import {Col, Container, Row} from "react-bootstrap";
import {route} from "ziggy-js";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";

export default function UserAuthLayout ({children}){


    return (
        <GuestLayout>

            <Container className="mt-5">
                <Row>
                    <Col lg={2} className="col-12 d-none d-lg-block">
                        <SideNav/>
                    </Col>
                    <Col lg={10} className="col-12">
                        {children}
                    </Col>
                </Row>
            </Container>

            <BottomNav/>

            <Footer/>
        </GuestLayout>
    );
}

