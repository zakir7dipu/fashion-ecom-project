import React, {Component, useEffect, useState} from 'react';
import banar_left from "../../../../../home_asset/images/banner-left.png";
import {Button, Col, Container, Row} from "react-bootstrap";
import Style from "./BulkOrder.module.css";
import Skeleton from "react-loading-skeleton";

export default function Index() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <section className={Style.section}>
            <Container fluid className={Style.wrapper}>
                <Row className={Style.bulkOrderRow}>
                    <Col lg={8} className={!isLoading && Style.bulkOrderWrapper}>
                        {isLoading ? (
                            <Skeleton count={6} height={18}/>
                        ) : (
                            <div className="p-3 p-lg-0">
                                <h2 className={Style.bulkOrderTitle}>Bulk Order/Wholesale</h2>
                                <p className={Style.bulkOrderText}>Because comfort and confidence go hand in
                                    hand.</p>
                                <p className={Style.bulkOrderText}>
                                    We focus on carefully selecting the best clothing that is
                                    comfortable, looks
                                    great, and makes you confident. Apart from the fabric, design and fit, we go
                                    through strict
                                    quality control parameters to give you what you truly deserve. The power of a
                                    good outfit is
                                    how it can influence your perception of yourself.</p>

                                <Button className={`btn-dark ${Style.bulkOrderBtn}`}>More Details</Button>
                            </div>
                        )}
                    </Col>

                    <Col lg={4}>
                        {isLoading ? (
                            <Skeleton height={200} width={'100%'}/>
                        ) : (
                            <img src={banar_left} className={Style.bulkOrderImg} alt="tranding_img"/>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
