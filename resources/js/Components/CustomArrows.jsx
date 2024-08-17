import React from 'react';
import Style from "./CustomArrows.module.css";

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${Style.slickNext}`}
            style={{ ...style}} // Ensure the font size is applied
            onClick={onClick}
        />
    );
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${Style.slickPrev}`}
            style={{ ...style}} // Ensure the font size is applied
            onClick={onClick}
        />
    );
};
