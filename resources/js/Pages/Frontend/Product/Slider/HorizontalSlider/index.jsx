import React, {createRef, Suspense, useEffect, useState} from 'react';
import Style from "@/Pages/Frontend/Product/Slider/HorizontalSlider/HorizontalSlider.module.css";
import {useInternalLink} from "@/Library/Helper.js";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

// Custom Next Arrow
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={`${className} ${Style.slickNext}`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={`${className} ${Style.slickPrev}`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const ProductImage = ({srcUrl}) => {
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
                <Skeleton width={'100%'} style={{aspectRatio: '1/1.25'}}/>
            ) : (
                <Suspense fallback={<Skeleton width={'100%'} style={{aspectRatio: '1/1.25'}}/>}>
                    <img className={Style.sliderImg} src={srcUrl} alt="" style={{width: '100%', aspectRatio: '1/1.25'}}/>
                </Suspense>
            )}
        </>
    )
}

function Index({images, getActiveImg}) {
    const sliderRef = createRef();
    const mSettings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    useEffect(()=>{
        sliderRef.current.slickGoTo(getActiveImg);
    },[getActiveImg]);

    return (
        <Slider ref={sliderRef} {...mSettings} className={Style.slider}>
            {images?.map((row, i) => (
                <div key={i} data-ref={i}>
                    <ProductImage srcUrl={useInternalLink(row?.image)}/>
                </div>
            ))}
        </Slider>
    );
}

export default Index;
