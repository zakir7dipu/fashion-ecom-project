import React, {useEffect, useState} from 'react';
import {Col, Container, Form, InputGroup, Row} from 'react-bootstrap';

import {useDispatch, useSelector} from "react-redux";
import {getAllData} from "@/Pages/reducers/addCardSlice.js";

import Style from "./MenuTop.module.css"
import {useInternalLink} from "@/Library/Helper.js";
import logo from "../../../../../../home_asset/common/logo.png";
import logoBrand from "../../../../../../home_asset/common/AM FASHION.png";
import MegaMenu from "@/Pages/Frontend/Partials/Header/Megamenu/index.jsx";
import {route} from 'ziggy-js';
import {Link, usePage} from "@inertiajs/react";
import {CiUser} from "react-icons/ci";
import {IoIosSearch} from "react-icons/io";
import {LuShoppingCart} from "react-icons/lu";
import ShortCart from "@/Pages/Frontend/ShortCart/index.jsx";
import SlidingCart from "@/Pages/Frontend/SlidingCart/index.jsx";
import ApplyCoupon from "@/Pages/Frontend/ApplyCoupon/index.jsx";

function Index() {
    const {component} = usePage();
    const {carts, company, auth} = usePage().props
    const {company_logo} = company.original;
    const user_role = auth?.role && auth.roles[0]

    const [isCartOpen, setCartOpen] = useState(false);
    const [isCouponOpen, setCouponOpen] = useState(false);
    const [isShortCartShow, setShortCartShow] = useState(false);

    const dispatch = useDispatch();
    const {isLoading, addCard, error_message, total} = useSelector((state) => state.addCard);

    const willShow = [
        "Frontend/Shop/index",
        "Frontend/Product/index"
    ]

    const toggleCart = () => {
        // setCartOpen(!isCartOpen);
        if (total > 0) {
            setCartOpen(!isCartOpen);
            setCouponOpen(false);
        }
    };

    const toggleCouponCart = () => {
        setCouponOpen(!isCouponOpen);
    };

    const ProfileImage = () => {
        if (auth.user == null) {
            return (
                <>
                    <a href={route('login')} className={Style.loginBtn}>
                        <CiUser fontSize={"24px"} fontWeight={900}/> Log in</a>
                </>
            )
        } else {
            return (
                <>
                    {user_role == "super_admin" ?
                        <a href={route('dashboard')} className={Style.loginBtn}>
                            <CiUser fontSize={"24px"} fontWeight={900}/> {auth.user?.name}
                        </a>
                        :
                        <a href={route('user.dashboard')} className={Style.loginBtn}>
                            <CiUser fontSize={"24px"} fontWeight={900}/> {auth.user?.name}
                        </a>
                    }
                </>
            )
        }
    }

    useEffect(()=>{
        dispatch(getAllData())
    },[dispatch])

    useEffect(() => {
        const shouldShow = willShow.some(comItem => component === comItem);
        shouldShow && setShortCartShow(true);
    }, [component])

    return (<section className={Style.topNavBar}>
        <Container fluid className={Style.wrapper}>
            <Row>
                <Col lg={3} className={`${Style.brand} order-lg-1 order-2 col-6`}>
                    <Link href={route('home')}>
                        <img src={company_logo ? useInternalLink(company_logo) : logo}
                             className={Style.logoIcon} alt="logo"/>
                        {/*<span className="am-logo">{company ? company.name : "AM FASHION"}</span>*/}
                        <img src={logoBrand} className={Style.logoBrandName} alt="logoBrandName"/>
                    </Link>

                </Col>

                <Col lg={6} className={`${Style.menu} order-lg-2 order-1 col-2`}>
                    <MegaMenu/>
                    <Form inline="true" className={Style.searchForm}>
                        <IoIosSearch
                            fontSize={`19px`}
                            color={`#BFBFBF`}
                            className={Style.searchIcon}
                        />
                        <input
                            type="text"
                            name=""
                            placeholder="Search Product Titles or Tags"
                            aria-label="Search"
                            aria-describedby="SearchBar"
                            className={Style.search}
                        />
                    </Form>
                </Col>

                <Col lg={3} className={`${Style.featuredAction} order-lg-3 order-3 col-4`}>
                    <ul className="ps-0">
                        <li className="d-lg-none d-inline">
                            <a href="">
                                <IoIosSearch
                                    fontSize={`24px`}
                                    color={`#1a1a1a`}
                                    className={Style.mSearchIcon}
                                />
                            </a>
                        </li>

                        <li>
                            <a onClick={toggleCart}>
                                <span className={Style.cartIcon}>
                                    <LuShoppingCart
                                        width={`24px`}
                                    />
                                    <span className={Style.cartCount}>{addCard ? addCard.length:0}</span>
                                </span>
                            </a>
                        </li>

                        <li className="d-lg-inline d-none">
                            {ProfileImage()}
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>

        {isShortCartShow && <ShortCart count={addCard ? total:0} toggleCart={toggleCart}/>}
        <SlidingCart isOpen={isCartOpen} toggleCart={toggleCart} toggleCouponCart={toggleCouponCart}/>
        <ApplyCoupon isCouponOpen={isCouponOpen} toggleCouponCart={toggleCouponCart}/>
        <div
            className={`${Style.overlay} ${isCartOpen || isCouponOpen ? Style.show : ''}`}
            onClick={toggleCart}
        />
    </section>);
}

export default Index;
