import React, {Suspense, useEffect, useState} from 'react';
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {Head} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import appIcon from "../../../../home_asset/images/Logo (1).png";
import {Col, Container, Row} from "react-bootstrap";
import ProductSlider from "@/Pages/Frontend/Product/Slider/index.jsx";
import Style from "./Product.module.css";
import ShortInfo from "@/Pages/Frontend/Product/ShortInfo/index.jsx";
import AccordionSection from "@/Library/Component/AccordionSection.jsx";
import TabsSection from "@/Library/Component/TabsSection.jsx";
import SocialShare from "@/Library/Component/SocialShare.jsx";
import {ucwords, uid} from "@/Library/Helper.js";
import Skeleton from "react-loading-skeleton";
import BottomNav from "@/Pages/Frontend/BottomNav/index.jsx";
import ProductCard from "@/Pages/Frontend/Partials/ProductCard/index.jsx";

const Loading = () => {
    return (
        <Container fluid className={Style.wrapper}>
            <Row>
                <Col lg={6}>
                    <Row className={`g-1`} style={{padding: '25px 0 10px 0'}}>
                        <Col lg={2} className="d-none d-lg-block">
                            {Array(5).fill().map(() => (
                                <Skeleton width="100%" style={{aspectRatio: '1/1.25'}} key={uid()}/>
                            ))}
                        </Col>

                        <Col lg={10}>
                            <Skeleton width="100%" style={{aspectRatio: '1/1.25'}}/>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} style={{padding: '25px 0 10px 0'}}>
                    <Skeleton width="150px" height="25px"/>
                    <Skeleton width="250px" height="25px"/>
                    <Skeleton width="350px" height="25px"/>
                    <br/>
                    <Skeleton width="450px" height="30px"/>
                    <br/>

                    <Skeleton width="100%" style={{aspectRatio: '2/1.55'}}/>
                </Col>
            </Row>
        </Container>
    )
}

const LoadingProductCard = ({cardCount, title}) => {
    return (
        <>
            {title && <h4 style={{
                fontSize: '26px',
                borderBottom: '1px solid #1A1A1A',
                padding: '20px 5px',
                marginBottom: '20px'
            }}>{title}</h4>}
            <Row className="g-3 pb-5">
                {Array(cardCount + 1).fill().map(item => (
                    <Col lg={cardCount} key={uid()}>
                        <Skeleton width="100%" style={{aspectRatio: '1/1.25'}}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

function Index({products, product_recent, wishList}) {
    const {product_image, image_gallerys, sku} = products;
    const [isLoading, setLoading] = useState(true);
    const [isRecentProductLoading, setRecentProductLoading] = useState(true);

    const productDetailsTab = [
        {
            title: "Panjabi Size Chart",
            key: sku + 1,
            img: product_image?.size_chart_image
        },
        {
            title: "How To Measure",
            key: sku + 2,
            img: product_image?.measure_image
        }
    ];

    const HtmlContent = (trending) => {
        const content = trending || '';
        return (
            <span dangerouslySetInnerHTML={{__html: content}}/>
        );
    };

    useEffect(() => {
        setLoading(false);
    }, [products])

    useEffect(() => {
        if (product_recent.length > 0) {
            setRecentProductLoading(false)
        }
    }, [product_recent])


    return (
        <GuestLayout>
            <Head>
                <title>{products?.name}</title>
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

            <section>
                {isLoading ? (
                    <Loading/>
                ) : (
                    <Suspense fallback={<Loading/>}>
                        <Container fluid className={Style.wrapper}>
                            <Row>
                                <Col lg={6}>
                                    <ProductSlider gallery={image_gallerys}/>
                                </Col>

                                <Col lg={6} className={Style.infoWrapper}>
                                    <ShortInfo products={products} wishList={wishList}/>


                                    <section className={Style.detailsSection}>
                                        <AccordionSection
                                            title="Description"
                                            isActive="0"
                                        >
                                            {HtmlContent(products?.description)}
                                        </AccordionSection>

                                        <AccordionSection
                                            title="Offer For You"
                                            isActive="1"
                                        >
                                            {ucwords(products?.offer_for_you)}
                                        </AccordionSection>

                                        <AccordionSection
                                            title="Return & Exchange Policy"
                                            isActive="1"
                                        >
                                            {ucwords(products?.return_exchange_policy)}
                                        </AccordionSection>
                                    </section>

                                    <section className={Style.detailsSection}>
                                        <TabsSection links={productDetailsTab}/>
                                    </section>

                                    <section className={Style.detailsSection}>
                                        <SocialShare/>
                                    </section>
                                </Col>
                            </Row>
                        </Container>
                    </Suspense>
                )}
            </section>

            <section>
                <Container fluid className={Style.wrapper}>
                    {isRecentProductLoading ? (
                        <LoadingProductCard
                            title="Frequently Brought Together"
                            cardCount={3}
                        />
                    ) : (
                        <Suspense fallback={<LoadingProductCard cardCount={3}/>}>
                            <ProductCard
                                title="Frequently Brought Together"
                                products={product_recent}
                                everyCol={3}
                            />
                        </Suspense>
                    )}
                </Container>

                <Container fluid className={Style.wrapper}>
                    {isRecentProductLoading ? (
                        <LoadingProductCard
                            title="Recently Viewed"
                            cardCount={3}
                        />
                    ) : (
                        <Suspense fallback={<LoadingProductCard cardCount={3}/>}>
                            <ProductCard
                                title="Recently Viewed"
                                products={product_recent}
                                everyCol={3}
                            />
                        </Suspense>
                    )}
                </Container>

                <Container fluid className={Style.wrapper}>
                    {isRecentProductLoading ? (
                        <LoadingProductCard
                            title="You May Also Like"
                            cardCount={3}
                        />
                    ) : (
                        <Suspense fallback={<LoadingProductCard cardCount={3}/>}>
                            <ProductCard
                                title="You May Also Like"
                                products={product_recent}
                                everyCol={3}
                            />
                        </Suspense>
                    )}
                </Container>
            </section>

            <BottomNav/>
        </GuestLayout>
    );
}

export default Index;
