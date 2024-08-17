import React, {Suspense, useEffect, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Style from './VerticalSlider.module.css';
import {useInternalLink} from "@/Library/Helper";
import Skeleton from "react-loading-skeleton";


// Custom Next Arrow
const NextArrow = (props) => {
    const { className, style, onClick, currentSlide, slideCount } = props;
    return (
        <button
            className={`${className} ${Style.slickNext}`}
            style={{ ...style,  top: "unset", bottom: 0}}
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
            style={{ ...style,  top: 0}}
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
                    <img src={srcUrl} alt="" style={{width: '100%', aspectRatio: '1/1.25'}}/>
                </Suspense>
            )}
        </>
    )
}

const Index = ({images, setActiveImg}) => {
    // console.log("dds",images);
    const vSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className={Style.verticalSlider}>
            <Slider {...vSettings}>
                {images.map((row, i) => {
                    return (
                        <div key={i} onClick={e=> setActiveImg(i) } className={Style.sliderItem}>
                            <ProductImage srcUrl={useInternalLink(row?.image)}/>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Index;
