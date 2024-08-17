import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import BlankImage from "@/../home_asset/content_slider.jpg";
import {useInternalLink} from "@/Library/Helper";
import "slick-carousel/slick/slick.css";
import {Col, Container, Row} from "react-bootstrap";
import "slick-carousel/slick/slick-theme.css";
import Style from "./ProductCarousel.module.css"
import {route} from "ziggy-js";


const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${Style.slickNext}`}
            style={{ ...style}} // Ensure the font size is applied
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${Style.slickPrev}`}
            style={{ ...style}} // Ensure the font size is applied
            onClick={onClick}
        />
    );
};

function Index({products}) {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };



    return (
        <>
            {/*<h2 className="text-center">Working in progress</h2>*/}
            {/*desktop*/}
            <Container className={`d-none d-lg-block`}>
                <Slider {...settings} className={Style.sliderWrapper}>
                    {products?.map((row, i) => (
                        <div key={i}>
                            <a className={Style.sliderCard} href={route('product.details', row?.slug)}>
                                <div className={Style.sliderPriceTag}>
                                    <del><span>Tk </span>{row?.regular_price}</del>
                                    <span>Tk </span>{row?.sale_price}
                                </div>
                                <img
                                    style={{minHeight: '390px'}}
                                    src={useInternalLink(row?.product_image?.product_image_big)}
                                    alt="Silder Image"
                                    className={Style.sliderImg}
                                />
                            </a>
                        </div>
                    ))}

                    {/* Add placeholders if there are less than 3 products */}
                    {products.length < 3 && Array.from({length: 3 - products.length}).map((_, i) => (
                        <div key={`placeholder-${i}`}>
                            <a className={Style.sliderCard} href="">
                                <div className={Style.sliderPriceTag}>
                                    <del><span>Tk </span>0</del>
                                    <span>Tk </span>0
                                </div>
                                <img
                                    style={{minHeight: '390px'}}
                                    src={BlankImage}
                                    alt="Product Image"
                                    className={Style.sliderImg}
                                />
                            </a>
                        </div>
                    ))}
                </Slider>
            </Container>

            {/*mobile*/}
            <Container className="d-lg-none d-block p-0 mt-4">
                <Row className="g-3">
                    {products?.map((row, i) => (
                            <Col className={`col-6 p-0 ${Style.sliderCardMv}`} key={i}>
                                <a href={route('product.details', row?.slug)}>
                                    <div className={Style.sliderPriceTagMV}>
                                        <del><span>Tk </span>{row?.regular_price}</del>
                                        <span>Tk </span>{row?.sale_price}
                                    </div>
                                    <img
                                        src={useInternalLink(row?.product_image?.product_image_big)}
                                        alt="Silder Image"
                                        className={Style.sliderImgMv}
                                    />
                                    {products.length <= 4?
                                        <>
                                            {i===2?
                                                <div className={Style.sliderImgMvOverlay}>
                                                    <p
                                                        // className="view-more-text"
                                                    >View More</p>
                                                </div>
                                                :""}
                                        </>:
                                        <>
                                            {i===3?
                                                <div className={Style.sliderImgMvOverlay}>
                                                    <p
                                                        // className="view-more-text"
                                                    >View More</p>
                                                </div>
                                                :""}
                                        </>
                                    }
                                </a>
                            </Col>
                        )
                    )}

                    {products?.length < 4 &&
                        Array.from({ length: 4 - (products?.length ?? 0) }).map((_, i) => (
                            <Col className={`col-6 p-0 ${Style.sliderCardMv}`} key={`empty_product-${i}`}>
                                <a href="#!"> {/* Adding a #! as a placeholder link */}
                                    <div className={Style.sliderPriceTagMV}>
                                        <del>
                                            <span>Tk </span>0
                                        </del>
                                        <span>Tk </span>0
                                    </div>
                                    <img
                                        src={BlankImage}
                                        alt="Product Image"
                                        className={Style.sliderImgMv}
                                    />
                                    <div className={Style.sliderImgMvOverlay} />
                                </a>
                            </Col>
                        ))}

                </Row>

            </Container>
        </>
    );
}

export default Index;
