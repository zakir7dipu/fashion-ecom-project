import React from 'react';
import {Col, Row} from "react-bootstrap";
import Style from "./ProductCard.module.css"
import {uid} from "@/Library/Helper.js";
import ProductItem from "@/Pages/Frontend/Partials/ProductCard/ProductItem/index.jsx";

function Index({title, products, everyCol}) {
    return (
        <>
            {title && <h4 className={Style.title}>{title}</h4>}
            <Row className={`gx-3 ${Style.row}`}>
                {products?.map((product) => (
                    <Col lg={everyCol} className="col-6" key={uid()}>
                        <ProductItem
                            product={product}
                        />
                    </Col>
                ))}

            </Row>
        </>
    );
}

export default Index;
