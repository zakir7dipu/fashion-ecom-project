import React, {useEffect, useState} from 'react';
import {useInternalLink} from "@/Library/Helper";
import ProductCarousel from "@/Pages/Frontend/Home/ProductShowcase/ProductCarousel/index.jsx";
import {Col, Container, Row} from "react-bootstrap";
import Style from "./ProductShowcase.module.css"
import {route} from "ziggy-js";
import {usePage} from "@inertiajs/react";
import Skeleton from "react-loading-skeleton";

export default function Index() {
    const {content_sliders} = usePage().props
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
    }, [content_sliders])


    return isLoading ? (
        <section className={`${Style.sectionContainSlider}`}>
            <Container fluid className={Style.wrapper}>
                <Row>
                    <Col lg={4} className={Style.sectionContainSliderCard}>
                        <Skeleton width={'100%'} style={{aspectRatio: "1 / 1"}}/>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col lg={4} sm={2}>
                                <Skeleton width={'100%'} style={{aspectRatio: "1 / 1.5"}}/>
                            </Col>
                            <Col lg={4} sm={2}>
                                <Skeleton width={'100%'} style={{aspectRatio: "1 / 1.5"}}/>
                            </Col>
                            <Col lg={4} sm={2}>
                                <Skeleton width={'100%'} style={{aspectRatio: "1 / 1.5"}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    ) : content_sliders.map((row, i) => (
        <section key={i} className={`${Style.sectionContainSlider}`}>
            <Container fluid className={Style.wrapper}>
                <Row>
                    <Col lg={4} className={Style.sectionContainSliderCard}>
                        <a href={route('shop.product', row?.slug)}>
                            <div className={Style.containSliderHeadImgTitle}>
                                <p> {row?.name} </p>
                            </div>
                            <img className={Style.containSliderHeadImg} src={useInternalLink(row?.image)}
                                 alt="shop_banner_img7"/>

                        </a>
                    </Col>
                    <Col lg={8} className={!isLoading && Style.sliderParentWrapper}>
                        {row?.products && <ProductCarousel products={row?.products}/>}
                    </Col>
                </Row>
            </Container>
        </section>
    ))
}

