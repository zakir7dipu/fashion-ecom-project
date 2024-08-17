import React, {Suspense, useEffect, useState} from 'react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Head, usePage} from "@inertiajs/react";
import appIcon from "../../../../home_asset/images/Logo (1).png";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {route} from "ziggy-js";
import Style from "./Shop.module.css";
import {Col, Container, Form, Row} from "react-bootstrap";
import AttributeFilter from "@/Pages/Frontend/Shop/AttributeFilter/index.jsx";
import {IoIosSearch} from "react-icons/io";
import CustomBreadcrumb from "@/Components/CustomBreadcrumb.jsx";
import MFilterSection from "@/Pages/Frontend/Shop/MFilterSection/index.jsx";
import ProductCard from "@/Pages/Frontend/Partials/ProductCard/index.jsx";
import {uid} from "@/Library/Helper.js"
import Skeleton from "react-loading-skeleton";
import SortByDrawer from "@/Pages/Frontend/Shop/SortByDrawer/index.jsx";
import * as PropTypes from "prop-types";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";
import FilterByDrawer from "@/Pages/Frontend/Shop/FilterByDrawer/index.jsx";


const LoadingSection = () => {
    return (
        <section className={Style.section}>
            <Container fluid className={Style.wrapper}>
                <Row>
                    <Col lg={2} className="d-none d-lg-block">
                        <Skeleton height={"100vh"} width={'100%'}/>
                    </Col>

                    <Col lg={10} className="p-0 pl-3">
                        <Skeleton height={"50px"} width={'100%'}/>
                        <Row>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                            <Col lg={3} sm={6}>
                                <Skeleton width={'100%'} style={{aspectRatio: '1/1.5'}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

function Index({products, filterCategories}) {

    const [isLoading, setLoading] = useState(true);
    const [isShowShortBy, setShowShortBy] = useState(false)
    const [isShowFilterBy, setShowFilterBy] = useState(false)

    const dummyScrambs = [
        {name: "Home", url: route("home")},
        {name: "Category", url: "#"},
        {name: "Sub-Category", url: "#"}
    ]

    const mFilterByHandler = (event) => {
        if (event === "short_by") {
            setShowShortBy(!isShowShortBy)
        } else {
            setShowFilterBy(!isShowFilterBy)
        }
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <GuestLayout>
            <Head>
                <title>Shop</title>
                <meta head-key="description" name="description" content="This is the default description"/>
                <meta head-key="keywords" name="keywords"
                      content="ecommerce, Fashion store, clean, minimal, modern, online store, responsive, retail, shopping, ecommerce store"/>
                <link rel="icon" type="image/svg+xml" href={appIcon}/>
            </Head>

            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />

            {isLoading ? (
                <LoadingSection/>
            ) : (
                <Suspense fallback={<LoadingSection/>}>
                    <section className={Style.section}>
                        <Container fluid className={Style.wrapper}>
                            <Row>
                                <Col lg={2} className="d-none d-lg-block">
                                    {
                                        filterCategories?.map((filter, i) => (
                                            <AttributeFilter filter={filter} index={i} key={uid()} sign="৳"/>
                                        ))
                                    }
                                </Col>

                                <Col lg={10} className="p-0 pl-3">
                                    <Row className="mb-3">
                                        <Col className="col-12 order-2 order-lg-1">
                                            <Container fluid>
                                                <Form inline className={Style.searchForm}>
                                                    <IoIosSearch
                                                        fontSize={`19px`}
                                                        color={`#BFBFBF`}
                                                        className={Style.searchIcon}
                                                    />

                                                    <Form.Control
                                                        type="text"
                                                        name="product_search"
                                                        placeholder="Search a Product"
                                                        aria-label="Search"
                                                        aria-describedby="SearchBar"
                                                        className={Style.search}
                                                    />
                                                </Form>
                                            </Container>
                                        </Col>


                                        <Col className="col-12 order-1 order-lg-2">
                                            <Container fluid>
                                                <CustomBreadcrumb scrambs={dummyScrambs}>
                                                    <Form.Select className={Style.selectBy}>
                                                        <option>Sort by</option>
                                                        <option value="popularity"> popularity</option>
                                                        <option value="date">Sort by newness</option>
                                                        <option value="price">Sort by price: low to high</option>
                                                        <option value="price-desc">Sort by price: high to low</option>
                                                    </Form.Select>
                                                </CustomBreadcrumb>
                                            </Container>
                                        </Col>

                                        <Container className={`order-3 ${Style.wrapper}`}>
                                            <MFilterSection getMFilterEvent={mFilterByHandler}/>
                                        </Container>
                                    </Row>


                                    <Container>
                                        <ProductCard
                                            products={products} // please insert your product here
                                            everyCol={3}
                                        />
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Suspense>
            )}

            <section>
                <SortByDrawer categories={filterCategories} show={isShowShortBy} getMFilterEvent={mFilterByHandler}/>
                <FilterByDrawer categories={filterCategories} show={isShowFilterBy} getMFilterEvent={mFilterByHandler}/>
            </section>

            <BottomNav/>
        </GuestLayout>
    );
}

export default Index;
