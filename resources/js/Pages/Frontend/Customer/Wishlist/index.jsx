import React, {Suspense, useEffect, useState} from 'react';
import { Head, useForm } from "@inertiajs/react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Col, Container, Row } from "react-bootstrap";
import UserAuthLayout from "@/Layouts/UserAuthLayout";
import Style from "@/Pages/Frontend/Customer/Wishlist/WishList.module.css";
import Card from "react-bootstrap/Card";
import { successMessage, inertiaErrorMessage, ucwords, useInternalLink } from "@/Library/Helper";
import Button from "react-bootstrap/Button";
import TrashIcon from "@/Library/CustomIconLibrary/TrashIcon";
import { useDispatch } from "react-redux";
import { postData } from "@/Pages/reducers/addCardSlice";
import Skeleton from "react-loading-skeleton";
import {route} from "ziggy-js";

const OrderImage = ({srcUrl}) => {
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
                <Skeleton className={Style.orderedProductImage} style={{aspectRatio: '1/1.5'}}/>
            ) : (
                <Suspense fallback={<Skeleton className={Style.orderedProductImage} style={{aspectRatio: '1/1.5'}}/>}>
                    <img src={srcUrl} alt="" className={Style.orderedProductImage}/>
                </Suspense>
            )}
        </>
    )
}

export default function Index({ wishList }) {
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, reset,post } = useForm({
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

    const dispatch = useDispatch();

    const handleAddToCart = async (wish) => {
        setIsLoading(true);
        const updatedData = {
            product_id: wish.product_id,
            name: wish.product?.name || '',
            size: wish.size || '',
            color: wish.color || '',
            quantity: wish.quantity || 1,
            product_image: wish.product?.product_image?.product_image || '',
            regular_price: wish.product?.regular_price || '',
            sale_price: wish.product?.sale_price || '',
            discount_percent: wish.product?.discount_percent || '',
            discount_amount: wish.product?.discount_amount || '',
            shipping: wish.product?.shipping || '',
            selected: true,
            coupon_id: wish.coupon_id || '',
            coupon_discount_amount: wish.coupon_discount_amount || '',
        };

        setData(updatedData);

        try {
            await dispatch(postData(updatedData)).unwrap();
            // console.log('Product added to cart successfully:', updatedData);
            successMessage("Product Card Save Success");
            // Remove item from wishlist
            AddToCartRemove(wish?.id);
            reset();
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const AddToCartRemove = (wish_id) => {
        post(route('wish.update', wish_id), {
            onStart: () => {},
            onSuccess: () => {
                successMessage("Wish list item removed successfully");
            },
            onError: (err) => {
                console.error("Error removing wish list item:", err);
                inertiaErrorMessage(err);
            }
        });
    };

    return (
        <UserAuthLayout>
            <Head title="Product Wish List" />
            <CircleSpinnerOverlay
                loading={isLoading}
                overlayColor="rgba(0,153,255,0.2)"
                size={30}
            />
            <Container className="mb-5">
                {wishList.length === 0 ? (
                    <div className="text-center">
                        <h4>No data found</h4>
                    </div>
                ) : (
                    <Row className="g-4">
                        {wishList.map((wish, i) => {
                            const { product } = wish;
                            return (
                                <Card className={Style.orderItemCard} key={i}>
                                    <Card.Body className={Style.cardBody}>
                                        <Row>
                                            <Col lg={9} className={Style.orderedProductWrapper}>
                                                <OrderImage srcUrl={useInternalLink(product?.product_image?.product_image_small)}/>

                                                <div className={Style.orderedProductInfo}>
                                                    {product?.name ? <h6 className={Style.orderedProductName}>{ucwords(product?.name)}</h6>: <Skeleton
                                                        width="150px"
                                                        height="20px"
                                                        className="mb-3"
                                                    />}
                                                    <span className={Style.orderedProductAttributes}>
                                                        {wish?.color && <span>Color: <span>{ucwords(wish?.color)}</span></span>}
                                                        {wish?.size && <span>Size: <span>{ucwords(wish?.size)}</span></span>}
                                                        <span>Price: <span>{wish?.quantity} x ৳{wish?.sale_price}</span></span>
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col lg={3} className={Style.orderedProductDelivery}>
                                                <Button
                                                    variant="success"
                                                    className={Style.bottomPaymentBtn}
                                                    onClick={() => handleAddToCart(wish)}
                                                >
                                                    Add To Cart
                                                </Button>
                                                <button
                                                    className={Style.itemCartTrashBtn}
                                                    onClick={() => AddToCartRemove(wish?.id)}
                                                >
                                                    <TrashIcon width="24px" height="26px" />
                                                </button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </UserAuthLayout>
    );
}
