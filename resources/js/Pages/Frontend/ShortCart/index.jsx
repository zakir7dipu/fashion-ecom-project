import React from 'react';
import Style from './ShortCart.module.css';
import {BiSolidCart} from "react-icons/bi";

function Index({count, toggleCart}) {
    return (
        <div className={Style.shortCartWrapper} onClick={toggleCart}>
            <span className={Style.shortCart}>
                <BiSolidCart className={Style.cartIcon}/>
            </span>
            <span className={Style.shortCartCount}>{count}</span>
        </div>
    );
}

export default Index;
