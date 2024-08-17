import React, {Suspense, useEffect, useState} from "react";
import {Link, usePage} from "@inertiajs/react";
import {uid, useInternalLink} from "@/Library/Helper";
import {Col, Container, Row} from "react-bootstrap";
import Style from "./NewArrival.module.css"
import Skeleton from "react-loading-skeleton";
import {route} from "ziggy-js";


const ImageLoading = () => (
    <Col lg={4} className={`${Style.newCard} ${Style.newArrivalImg} col-6`}>
        <Skeleton className={`${Style.newCardSkeleton}`}/>
    </Col>
)

const NewArrivalImageView = ({srcUrl}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = srcUrl
        img.onload = () => {
            setLoading(false);
        };
    }, [srcUrl]);

    return (
        <>
            {loading ? (
                <ImageLoading/>
            ) : (
                <Suspense fallback={<ImageLoading/>}>
                    <img className={Style.newArrivalImg} src={srcUrl}
                         alt="shop_banner_img7"/>
                </Suspense>
            )}
        </>
    )
}

const Loading = () => {
    return (
        <>
            <Container fluid className={`${Style.newArrivalSectionHead} ${Style.wrapper}`}>
                <Skeleton baseColor="#e5e6eb" highlightColor="#cdced3" className={Style.newArrivalSkeleton}/>
            </Container>


            <Container fluid className={`${Style.wrapper} p-0`}>
                <Row className={`g-3 ${Style.newArrivalItemWrapper}`}>
                    <Col lg={4} className={`${Style.newCard} col-6`}>
                        <Skeleton className={`${Style.newCardSkeleton}`}/>
                    </Col>
                    <Col lg={4} className={`${Style.newCard} col-6`}>
                        <Skeleton className={`${Style.newCardSkeleton}`}/>
                    </Col>
                    <Col lg={4} className={`${Style.newCard} col-6`}>
                        <Skeleton className={`${Style.newCardSkeleton}`}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default function Index({isMCat}) {
    const {subcategories} = usePage().props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(subcategories.length > 0) {
            setLoading(false)
        }
    }, [subcategories])

    return (
        <section className={Style.newArrivalSection}>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <Suspense fallback={<Loading/>}>
                        {!isMCat && <Container fluid className={`${Style.newArrivalSectionHead} ${Style.wrapper}`}>
                            <h4>NEW ARRIVAL</h4>
                        </Container>}


                        <Container fluid className={`${Style.wrapper} p-0`}>
                            <Row className={`g-3 ${Style.newArrivalItemWrapper}`}>
                                {subcategories.map(row => (
                                    <Col lg={4} key={uid()} className={`${Style.newCard} col-6`}>
                                        <div>
                                            <a href={route('shop.product', row?.slug)}>
                                                <div className={Style.newArrivalTitle}>
                                                    <p> {row?.name}</p>
                                                </div>
                                                <NewArrivalImageView srcUrl={useInternalLink(row?.image)}/>
                                                {/*<img className={Style.newArrivalImg} src={srcUrl}*/}
                                                {/*     alt="shop_banner_img7"/>*/}
                                            </a>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Suspense>
                )
            }
        < /section>
    );
};


