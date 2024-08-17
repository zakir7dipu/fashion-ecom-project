import React, {Suspense, useEffect, useState} from 'react';
import NewsLetterBannerImage from "../../../../../home_asset/common/Banner.png";
import NewsLetterBannerImageMv from "../../../../../home_asset/common/Banner_mobile.png";
import {Container} from "react-bootstrap";
import Style from "./NewsLetter.module.css"
import Skeleton from "react-loading-skeleton";

const NewsLetterImage = ({srcUrlW, srcUrlM}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = srcUrlW
        img.onload = () => {
            setLoading(false);
        };
    }, [srcUrlW]);

    useEffect(() => {
        const img = new Image();
        img.src = srcUrlM
        img.onload = () => {
            setLoading(false);
        };
    }, [srcUrlM]);


    return loading ? (
        <Skeleton width={'100%'} style={{aspectRatio: '5/1'}}/>
    ) : (
        <Suspense fallback={<Skeleton width={'100%'} style={{aspectRatio: '5/1'}}/>}>
            <img src={srcUrlW} className={`${Style.bannerImage} d-lg-block d-none`} alt="shop_banner_img_mobile"/>
            <img src={srcUrlM} className={`${Style.bannerImage} d-lg-none d-block"`} alt="shop_banner_img_mobile"/>
        </Suspense>
    )
}
export default function Index() {
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    },[])

    return isLoading ? (
        <Skeleton width={'100%'} style={{aspectRatio: '5/1'}}/>
    ) : (
        <Suspense fallback={<Skeleton width={'100%'} style={{aspectRatio: '5/1'}}/>}>
            <section className={Style.section}>
                <Container fluid className={`${Style.wrapper}`}>
                    <a href="#">
                        <NewsLetterImage srcUrlW={NewsLetterBannerImage} srcUrlM={NewsLetterBannerImageMv}/>
                    </a>
                </Container>
            </section>
        </Suspense>
    );
}

