import React from 'react';

function WishlistIcon(props) {
    const { width, height, status } = props;

    // Define colors based on status
    const fillColor = status ? "#FF0000" : "#FFFFFF";  // Red if status is true, otherwise white
    const lineColor = status ? "#FF0000" : "#1A1A1A"; // Black stroke color

    return (
        <svg width={width} height={height} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.0374 20.7697L12.0372 20.7699L2.62222 11.3549C0.465779 9.19843 0.460578 5.71689 2.59887 3.5786C4.73715 1.44031 8.21869 1.44552 10.3751 3.60196L11.2819 4.50875L11.9897 5.21654L12.6968 4.50807L13.5907 3.6125C13.5908 3.61241 13.5909 3.61231 13.591 3.61221C15.7338 1.46969 19.2171 1.47499 21.378 3.6359C23.5332 5.79109 23.5377 9.26182 21.4024 11.4102C21.402 11.4106 21.4017 11.4109 21.4013 11.4113L12.0374 20.7697Z"
                fill={fillColor}  // Set fill color based on status
                stroke={lineColor}  // Set stroke (line) color
                strokeWidth="2"
            />
        </svg>
    );
}

export default WishlistIcon;
