import React from 'react';
import ArrowLeftIcon from "@/Library/CustomIconLibrary/ArrowLeftIcon.jsx";
import Style from "./Arrows.module.css";

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
