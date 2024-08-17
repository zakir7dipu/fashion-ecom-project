import React, { useRef, useEffect, useState } from 'react';
import Style from "./PriceFilture.module.css";

function Index(props) {
    const minViewRef = useRef(null);
    const maxViewRef = useRef(null);
    const rangeFillRef = useRef(null);

    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(250);

    const validateRange = (min, max) => {
        if (min > max) {
            let tempValue = max;
            max = min;
            min = tempValue;
        }

        const minPercentage = ((min - 10) / 490) * 100;
        const maxPercentage = ((max - 10) / 490) * 100;

        if (rangeFillRef.current) {
            rangeFillRef.current.style.left = minPercentage + "%";
            rangeFillRef.current.style.width = maxPercentage - minPercentage + "%";
        }

        if (minViewRef.current) minViewRef.current.innerHTML = "৳" + min;
        if (maxViewRef.current) maxViewRef.current.innerHTML = "৳" + max;
    };

    useEffect(() => {
        validateRange(minPrice, maxPrice);
    }, [minPrice, maxPrice]);

    const handleMinPriceChange = (event) => {
        setMinPrice(parseInt(event.target.value));
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(parseInt(event.target.value));
    };

    return (
        <div className={Style.card}>
            <div className={Style.priceContent}>
                <div>
                    <label className={Style.label}>Min</label>
                    <p className={Style.p} ref={minViewRef}>${minPrice}</p>
                </div>

                <div>
                    <label className={Style.label}>Max</label>
                    <p className={Style.p} ref={maxViewRef}>${maxPrice}</p>
                </div>
            </div>

            <div className={Style.rangeSlider}>
                <div ref={rangeFillRef} className={Style.rangeFill}></div>

                <input
                    type="range"
                    value={minPrice}
                    min="10"
                    max="500"
                    step="10"
                    onChange={handleMinPriceChange}
                />
                <input
                    type="range"
                    value={maxPrice}
                    min="10"
                    max="500"
                    step="10"
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    );
}

export default Index;
