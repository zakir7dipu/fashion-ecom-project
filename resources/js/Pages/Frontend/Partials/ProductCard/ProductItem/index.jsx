import React, {Suspense, useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Style from "./ProductItem.module.css"
import {useInternalLink} from "@/Library/Helper.js";
import {route} from "ziggy-js";
import Attribute from "@/Pages/Frontend/Partials/ProductCard/Attribute/index.jsx";
import Skeleton from "react-loading-skeleton";

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
                    <Card.Img variant="top"  src={srcUrl} style={{width:'100%', aspectRatio: '1/1.25'}}/>
                </Suspense>
            )}
        </>
    )
}

function Index({product}) {
    const {name, regular_price, sale_price, product_image, sku, size,slug} = product

    return (
        <a href={route('product.details', product?.slug)}>
            <Card className={Style.card}>
                <ProductImage srcUrl={useInternalLink(product_image?.product_image_big)}/>
                <Card.Body>
                    <Card.Title className={Style.title}>{name}</Card.Title>
                    <Card.Text>
                        <p className={Style.priceSection}>
                            <del><span>Tk </span>{regular_price}</del>
                            <span>Tk </span>{sale_price}
                        </p>

                        {size && <Attribute productAttribute={size} className={Style.pCardCenter}/>}
                    </Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
}

export default Index;
