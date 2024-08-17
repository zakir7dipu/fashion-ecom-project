import React, {Suspense, useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInternalLink } from '@/Library/Helper';
import Style from './Trending.module.css';
import {usePage} from "@inertiajs/react";
import Skeleton from "react-loading-skeleton";


const TrendingImage = ({srcUrl}) => {
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
                <Skeleton height={200} width={'100%'} />
            ) : (
                <Suspense fallback={<Skeleton height={200} width={'100%'} />}>
                    <img
                        src={srcUrl}
                        className={Style.trandingImg}
                        alt="tranding img"
                    />
                </Suspense>
            )}
        </>
    )
}

export default function Index() {
    const {company}= usePage().props
    const {trending, trending_image} = company.original
    const [isLoading, setLoading] = useState(true)

    const HtmlContent = () => {
        return (
            trending && <div dangerouslySetInnerHTML={{ __html: trending }} />
        );
    };

    useEffect(()=>{
        setLoading(false)
    },[])

    return (
        <section>
            <Container fluid className={Style.wrapper}>
                <Row>
                    <Col lg={8} className={!isLoading && Style.trandingWrapper}>
                        {isLoading ? (
                            <Skeleton count={5} height={18}/>
                        ) : (
                            <HtmlContent />
                        )}

                    </Col>
                    <Col lg={4} className={`p-0`}>
                        {isLoading ? (
                            <Skeleton height={200} width={'100%'} />
                        ) : (
                            <TrendingImage srcUrl={trending_image && useInternalLink(trending_image)}/>
                        )}

                    </Col>
                </Row>
            </Container>
        </section>
    );
}
