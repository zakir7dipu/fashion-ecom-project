import React, {useEffect, useState} from 'react';
import Style from "./ShortInfo.module.css";
import QtyInput from "@/Library/Component/QtyInput.jsx";
import {Button} from "react-bootstrap";
import {postData} from "@/Pages/reducers/addCardSlice.js";
import {infoMessage, successMessage} from "@/Library/Helper.js";
import {useDispatch} from "react-redux";
import {useForm, usePage} from "@inertiajs/react";
import {inertiaErrorMessage} from "@/Library/Helper";
import Attribute from "@/Pages/Frontend/Product/Attribute/index.jsx";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {route} from "ziggy-js";

function ShortInfo({products, wishList}) {

    const {auth} = usePage().props
    const user_role = auth?.roles ? auth?.roles[0] : null
    const user = auth?.user ? auth?.user : null

    const {
        name,
        regular_price,
        sale_price,
        colors,
        size,
        id,
        product_image,
        discount_percent,
        discount_amount,
        shipping
    } = products;
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [productQty, setProductQty] = useState(1);
    const [wishListStatus, setWishListStatus] = useState();

    const {data, setData, errors, processing, post, reset, destroy} = useForm({
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


    const submit = (e) => {
        e.preventDefault();
        post(route('wish.store'), {
            onStart: () => {
                //
            },
            onSuccess: (data) => {
                console.log(data)
                successMessage("Wish list saved successfully");
            },
            onError: (err) => {
                console.error("Error while saving wish list:", err);
                inertiaErrorMessage(err);
            }
        });
    };


    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(postData(data))
            .unwrap()
            .then((response) => {
                // console.log('Product added to cart successfully:', response);
                successMessage("Product Card Save Success");
                setProductQty(1)
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    }

    const colorSelect = (newColor) => {
        setData(data => ({...data, color: newColor}));
        setSelectedColor(newColor);
    }

    const sizeSelect = (newSize) => {
        setData(data => ({...data, size: newSize}));
        setSelectedSize(newSize);
    }

    const selectQty = (newQty) => {
        setData(data => ({...data, quantity: newQty}));
    }

    useEffect(() => {
        setData(data => ({...data, product_id: id}));
        setData(data => ({...data, name: name}));
        product_image && setData(data => ({...data, product_image: product_image?.product_image}));
        regular_price && setData(data => ({...data, regular_price: regular_price}));
        sale_price && setData(data => ({...data, sale_price: sale_price}));
        discount_percent && setData(data => ({...data, discount_percent: discount_percent}));
        discount_amount && setData(data => ({...data, discount_amount: discount_amount}));
        shipping && setData(data => ({...data, shipping: shipping}));
        setData(data => ({...data, selected: true}));

        if (colors) {
            const colorsArray = colors.split(",");
            if (colorsArray.length > 0) {
                const defaultColor = colorsArray[0]; // Assuming the first color is the default
                setData(prevData => ({...prevData, color: defaultColor}));
                setSelectedColor(defaultColor);
            }
        }
        if (size) {
            const sizesArray = size.split(",");
            if (sizesArray.length > 0) {
                const defaultSize = sizesArray[0]; // Assuming the first color is the default
                setData(prevData => ({...prevData, size: defaultSize}));
                setSelectedSize(defaultSize);
            }
        }
    }, [products]);


    useEffect(() => {
        const found = wishList.some(item => item.product_id === products.id);
        setWishListStatus(found)
    }, [data]);

    return (
        <section className={Style.section}>
            <div className={Style.wishList}>
                {

                    !wishListStatus ? (
                        <a href="#" onClick={(e) => submit(e)}>
                            <FaRegHeart
                                fontSize="24px"
                                color="#1A1A1A"
                            />
                        </a>
                    ) : (
                        <a href="#" onClick={(e) => {
                            infoMessage("This product has already been added to your wishlist.")
                        }}>
                            <FaHeart
                                fontSize="24px"
                                color="#FF0000"
                            />
                        </a>
                    )}
            </div>
            <h4 className={Style.title}>{name}</h4>
            <div className={Style.price}>
                {regular_price && <del>৳{regular_price}</del>}
                {sale_price && <span> ৳{sale_price}</span>}
            </div>

            {colors &&
                <Attribute
                    attributeTitle="Color"
                    productAttribute={colors}
                    setdate={colorSelect}
                    activeData={selectedColor}
                />
            }

            {size &&
                <Attribute
                    attributeTitle="Size"
                    productAttribute={size}
                    setdate={sizeSelect}
                    activeData={selectedSize}
                />
            }

            <div className={Style.qtySection}>
                <span className={Style.qtyTitle}>Quantity:</span>
                <div className={Style.qtyInputSection}>
                    <QtyInput
                        getQty={selectQty}
                        setQty={productQty}
                    />
                    <Button
                        variant="success"
                        type="submit"
                        className={Style.addToCartBtn}
                        onClick={handleAddToCart}
                    >Add To Cart</Button>
                </div>
            </div>

        </section>
    );
}

export default ShortInfo;
