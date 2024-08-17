import React, {Suspense, useEffect, useState} from 'react';
import Slider from "react-slick/lib";
import frame19 from "../../../../../home_asset/images/Frame 19.png";
import frame17 from "../../../../../home_asset/images/Frame 17.png";
import frame22 from "../../../../../home_asset/images/Frame 22.png";
import frame18 from "../../../../../home_asset/images/Frame 18.png";
import frame9 from "../../../../../home_asset/images/Frame 9.png";
import frame20 from "../../../../../home_asset/images/Frame 20.png";
import {Col, Container, Row} from "react-bootstrap";
import Style from "./PartnerShowcase.module.css"
import Skeleton from "react-loading-skeleton";

const NextArrow = (props) => {
    const {className, style, onClick, currentSlide, slideCount} = props;
    // const isDisabled = currentSlide === slideCount - 1;
    return (
        <button
            className={`${className} ${Style.slickNext}`}
            style={{...style}}
            onClick={onClick}
        />
    );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <button
            className={`${className} ${Style.slickPrev}`}
            style={{...style}}
            onClick={onClick}
        />
    );
};

const PartnerImage = ({srcUrl}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = srcUrl
        img.onload = () => {
            setLoading(false);
        };
    }, [srcUrl]);


    return loading ? (
        <Skeleton width={'100px'} style={{aspectRatio: '1/1'}}/>
    ) : (
        <Suspense fallback={<Skeleton width={'100px'} style={{aspectRatio: '1/1'}}/>}>
            <img src={srcUrl} alt="cl_logo" className="img-fluid" style={{
                width: '100px',
                aspectRatio: '1/1',
                border: '1px solid #eaeaea',
                borderRadius: '5px',
                padding: '5px'
            }}/>
        </Suspense>
    )
}

export default function Index() {
    const [isLoading, setLoading] = useState(true);
    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 3,
        rows: 2,
        slidesPerRow: 2,
        dots: false,
        infinite: true,
        autoplay: true,
        lazyLoad: true,
        speed: 500,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
            <section className={Style.section}>
                <Container fluid className={Style.wrapper}>
                    <h2 className={Style.partnerSectionTitle}>OUR PARTNER</h2>

                    {isLoading? (
                        <Container fluid className={Style.wrapper}>
                            <Row>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                                <Col lg={2} sm={3}><Skeleton width={'100%'} style={{aspectRatio: '1/1'}}/></Col>
                            </Row>
                        </Container>
                    ): (
                        <Container fluid className={Style.wrapper}>
                            <Slider {...settings}>
                                <div>
                                    <PartnerImage srcUrl={frame19}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame17}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame18}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame9} />
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame20}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame19}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame17}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame18}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame9} />
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame20}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                                <div>
                                    <PartnerImage srcUrl={frame22}/>
                                </div>
                            </Slider>
                        </Container>
                    )}
                </Container>
            </section>
    );
}

