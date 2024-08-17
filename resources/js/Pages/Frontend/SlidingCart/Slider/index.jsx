import React, { useState } from 'react';
import Style from "./Slider.module.css";
import { Button, Container } from "react-bootstrap";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrow.jsx";
import { useForm } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { postData } from "@/Pages/reducers/addCardSlice";
import { successMessage } from "@/Library/Helper";
import { useInternalLink } from "@/Library/Helper.js";

function Index({ products }) {
    const [productQty, setProductQty] = useState(1);

    const { data, setData, errors, processing, post, reset, destroy } = useForm({
        product_id: '',
        name: '',
        size: '',
        color: '',
        quantity: 1,
        product_image: '',
        regular_price: '',
        sale_price: '',
        discount_percent: '',
        discount_amount: '',
        shipping: '',
        selected: true,
        coupon_id: '',
        coupon_discount_amount: '',
    });

    // console.log(data);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => (e) => {
        e.preventDefault();

        setData({
            ...data,
            product_id: product.id,
            name: product.name,
            quantity: productQty,
            product_image: product.product_image.product_image,
            regular_price: product.regular_price,
            sale_price: product.sale_price,
            discount_percent: product.discount_percent,
            discount_amount: product.discount_amount,
            shipping: product.shipping,
        });

        if (product.colors) {
            const colorsArray = product.colors.split(",");
            if (colorsArray.length > 0) {
                const defaultColor = colorsArray[0]; // Assuming the first color is the default
                setData(prevData => ({...prevData, color: defaultColor}));
            }
        }
        if (product.size) {
            const sizesArray = product.size.split(",");
            if (sizesArray.length > 0) {
                const defaultSize = sizesArray[0]; // Assuming the first color is the default
                setData(prevData => ({...prevData, size: defaultSize}));
            }
        }

        dispatch(postData(data))
            .unwrap()
            .then((response) => {
                successMessage("Product added to cart successfully");
                setProductQty(1);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    return (
        <Container className={`col-12 ${Style.sliderSec}`}>
            <h6 className={Style.sliderSecTitle}>You may also like</h6>

            <Slider {...settings}>
                {products.map((product, i) => {
                    return (
                        <div key={i} className={`${Style.sliderCard}`}>
                            <a href="">
                                <img
                                    src={useInternalLink(product?.product_image?.product_image_small)}
                                    alt="Slider Image"
                                    className={Style.sliderImg}
                                />
                                <div className={Style.sliderPriceTag}>
                                    <del><span>Tk </span>{product?.regular_price}</del>
                                    <span>Tk </span>{product?.sale_price}
                                </div>
                                <button className={Style.addToCartBtn} type="button" onClick={handleAddToCart(product)}>Add to cart</button>
                            </a>
                        </div>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default Index;
