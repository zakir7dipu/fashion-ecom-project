import {Carousel} from 'react-bootstrap';
import './Slider.css';
import React, {Suspense, useEffect, useState} from "react";
import {useInternalLink} from "@/Library/Helper";
import Skeleton from "react-loading-skeleton";
import Style from "./Carousel.module.css";
import {usePage} from "@inertiajs/react";

const Loading = () => (
    <Skeleton baseColor="#e5e6eb" highlightColor="#cdced3" className={Style.sliderSkeleton}/>
)

const ViewImage = ({srcUrl}) => {
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
                <Loading/>
            ) : (
                <Suspense fallback={<Loading/>}>
                    <img src={srcUrl} className="d-block w-100" alt="..."/>
                </Suspense>
            )}
        </>
    )
}

export default function Index() {
    const {sliders} = usePage().props
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    },[])

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <Suspense fallback={<Loading/>}>
                    <Carousel prevIcon={null} nextIcon={null}>
                        {sliders?.map((row, i) => (
                            <Carousel.Item key={i}>
                                <ViewImage srcUrl={useInternalLink(row?.image)}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Suspense>
            )}

        </>
    );
}



