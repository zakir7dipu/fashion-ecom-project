import React, {createRef, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Style from "./CartItem.module.css";
import {IoTrash} from "react-icons/io5";

function CartItem({image, name, color, size, price, quantity, onUpdateQuantity, onRemoveCart, onCheckCart, selected}) {
    const inputQtyRef = createRef();
    const [cartQty, setCartQty] = useState(quantity);

    const increase = () => {
        const newQty = parseInt(inputQtyRef.current.value) + 1;
        onUpdateQuantity(newQty);
        setCartQty(newQty);
    };

    const decrease = () => {
        const newQty = inputQtyRef.current.value > 1 ? parseInt(inputQtyRef.current.value) - 1 : 1;
        onUpdateQuantity(newQty);
        setCartQty(newQty);
    };

    const checkInput = () => {
        setCartQty(inputQtyRef.current.value ? parseInt(inputQtyRef.current.value) : 1);
    };

    useEffect(() => {
        inputQtyRef.current.value = cartQty;
    }, [cartQty]);

    return (
        <Col className={Style.itemCart}>
            <Row>
                <Col className={`col-1 ${Style.itemCartCheckRadio}`}>
                    <input
                        className={Style.cartItemInput}
                        type="checkbox"
                        checked={selected}
                        onChange={onCheckCart}
                    />
                </Col>
                <Col className={`col-3 ${Style.itemCartImageWrapper}`}>
                    <img src={image} alt="" className={Style.itemCartImg}/>
                </Col>
                <Col className={`col-8 ${Style.itemCartDetails}`}>
                    <h5 className={Style.itemCartHead}>
                        <span className={Style.itemCartHeadTitle}>{name}</span>
                        <button className={Style.itemCartTrashBtn} onClick={onRemoveCart}>
                            <IoTrash
                                width="18px"
                                color="#1a1aa1a"
                            />
                        </button>
                    </h5>
                    <p className={Style.itemCartAttributeSec}>
                        <span>Color: </span>
                        <span className={Style.itemCartAttribute}>{color}</span>
                    </p>
                    <p className={Style.itemCartAttributeSec}>
                        <span>Size: </span>
                        <span className={Style.itemCartAttribute}>{size}</span>
                    </p>

                    <div className={Style.itemCartAttributeSec}>
                        <span>Unit Price: </span>
                        <span className={Style.itemCartPrice}>৳ {price}</span>
                        <span className={Style.itemCartQtySec}>
                            <div className={Style.itemCartQty}>
                                <button className={`btn ${Style.itemCartQtyBtn}`} onClick={decrease}>-</button>
                                <input
                                    ref={inputQtyRef}
                                    className={Style.itemCartQtyInputNumber}
                                    type="text"
                                    onKeyUp={checkInput}
                                />
                                <button className={`btn ${Style.itemCartQtyBtn}`} onClick={increase}>+</button>
                            </div>
                        </span>
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default CartItem;
