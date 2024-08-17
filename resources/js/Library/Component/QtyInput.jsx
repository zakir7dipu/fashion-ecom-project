import React, {createRef, useEffect, useState} from 'react';
import Style from "./QtyInput.module.css";

function QtyInput({getQty, setQty}) {
    const inputRef = createRef()
    const [productQty, setProductQty] = useState(setQty);

    const increase = () => {
        setProductQty(parseInt(inputRef.current.value) +1)
    }

    const decrease = () => {
        if(inputRef.current.value > 1)  setProductQty(parseInt(inputRef.current.value) -1);
    }

    // const checkInput = () => {
    //     inputRef.current.value?
    //         setProductQty(parseInt(inputRef.current.value))
    //         : setProductQty(1);
    // }

    const checkInput = () => {
        const value = inputRef.current.value;
        setProductQty(value ? parseInt(value) : 1);
    }

    useEffect(()=>{
        getQty(productQty)
        // inputRef.current.value = productQty
    },[productQty])

    return (
        <div className={Style.section}>
            <button className={`btn ${Style.btn}`} onClick={decrease}>-</button>
            <input
                ref={inputRef}
                className={Style.inputNumber}
                type="text"
                onKeyUp={checkInput}
                value={productQty}
            />
            <button className={`btn ${Style.btn}`} onClick={increase}>+</button>
        </div>
    );
}

export default QtyInput;

