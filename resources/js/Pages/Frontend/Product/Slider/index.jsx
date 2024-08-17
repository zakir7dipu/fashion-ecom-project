import React, {createRef, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import HorizontalSlider from "@/Pages/Frontend/Product/Slider/HorizontalSlider/index.jsx";
import VerticalSlider from "@/Pages/Frontend/Product/Slider/VerticalSlider/index.jsx";

function Index({gallery}) {
    const [activeImage, setImage] = useState(1);
    const activeView = (activeItem) => {
        setImage(activeItem);
    }

    return (
        <Row className={`g-1`} style={{padding: '25px 0 10px 0'}}>
            <Col lg={2} className="d-none d-lg-block">
                <VerticalSlider images={gallery} setActiveImg={activeView}/>
            </Col>

            <Col lg={10}>
                <HorizontalSlider images={gallery} getActiveImg={activeImage}/>
            </Col>
        </Row>
    );
}

export default Index;
