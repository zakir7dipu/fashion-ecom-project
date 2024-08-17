import React, {useEffect, useState} from "react";
import {Link, usePage} from "@inertiajs/react";
import logo from "../../../../../home_asset/common/Logo (1).png";
import profile from "../../../../../home_asset/common/avature.png";
import {useInternalLink} from "@/Library/Helper";
import {useDispatch, useSelector} from "react-redux";
import {getAllData} from "@/Pages/reducers/addCardSlice";
import {getCategoriesData, getCompanyData} from "@/Pages/reducers/CommonDataGetSlice";
import {Col, Container, Row} from "react-bootstrap";
import Style from "./Footer.module.css"
import Facebook from "@/Library/CustomIconLibrary/Facebook.jsx";
import Tiktok from "@/Library/CustomIconLibrary/Tiktok.jsx";
import Instragram from "@/Library/CustomIconLibrary/Instragram.jsx";
import Youtube from "@/Library/CustomIconLibrary/Youtube.jsx";
import Linkedin from "@/Library/CustomIconLibrary/linkedin.jsx";
import {route} from "ziggy-js";

export default function Footer() {
    const {company} = usePage().props
    const {company_logo, name} = company.original
    const dispatch = useDispatch();
    // const {company, categories, error} = useSelector(state => state.commonData);

    // console.log(company);

    useEffect(() => {
        // dispatch(getCompanyData());
        // dispatch(getCategoriesData());
    }, [dispatch]);

    return (
        <footer className={Style.footer}>
            <Container fluid className={Style.wrapper}>
                <Row>
                    <Col lg={5} className={Style.footerC1}>
                        <Row>
                            <Col lg={2} className={Style.footerLogoWrapper}>
                                <img src={typeof company_logo === 'string' ? company_logo && useInternalLink(company_logo) : logo}
                                     className={Style.footerLogo} alt="logo"/>
                            </Col>
                            <Col lg={10}>
                                <p className={Style.footerP}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
                                    sit Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Col>
                            <Col lg={2} className="d-none d-lg-block"/>
                            <Col lg={8} className="col-12">
                                <ul className={Style.socialLinkWrapper}>
                                    <li>
                                        <a href="#">
                                            <Facebook
                                                width={28}
                                                height={29}
                                            />
                                            <p className={Style.socialLinkName}>Facebook</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Tiktok
                                                width={28}
                                                height={29}
                                            />
                                            <p className={Style.socialLinkName}>Tiktok</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Instragram
                                                width={28}
                                                height={29}
                                            />
                                            <p className={Style.socialLinkName}>Instragram</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Youtube
                                                width={28}
                                                height={29}
                                            />
                                            <p className={Style.socialLinkName}>Youtube</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Linkedin
                                                width={28}
                                                height={29}
                                            />
                                            <p className={Style.socialLinkName}>Linkedin</p>
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={7}>
                        <Row>
                            <Col lg={4}>
                                <h6 className={Style.footerCTitle}>Useful Links</h6>
                                <ul className={Style.footerCLinkWrapper}>
                                    <li><Link href={route("home")}>Home</Link></li>
                                    <li><a href="#">Shop</a></li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Whole Sale</a></li>
                                    <li><a href="#">Blog</a></li>
                                </ul>
                            </Col>

                            <Col lg={4}>
                                <h6 className={Style.footerCTitle}>Other Links</h6>
                                <ul className={Style.footerCLinkWrapper}>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Cookies Policy</a></li>
                                    <li><a href="#">Replacement Policy</a></li>

                                </ul>
                            </Col>

                            <Col lg={4}>
                                <h6 className={Style.footerCTitle}>Other Links</h6>
                                <ul className={Style.footerCLinkWrapper}>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Cart</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                    <li><a href="#">Login</a></li>
                                </ul>
                            </Col>

                            <Col lg={4} className="d-none d-lg-block"/>

                            <Col lg={8}>
                                <h6 className={Style.footerCTitle}>Subscribe Us</h6>
                                <form action="" method="post">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Enter Your Email"/>
                                        <button className="btn btn-danger">Subscribe</button>
                                    </div>
                                </form>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container fluid className={`${Style.wrapper} ${Style.footerBottom}`}>
                <p className="mb-md-0 text-center">Copyright © {new Date().getFullYear()} {typeof name === 'string' ? name : "AM FASHION"}. All Right
                    Reserved</p>
            </Container>
        </footer>
    );
};


