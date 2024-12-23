import React from 'react';

function Facebook(props) {
    const {width, height} = props
    return (
        <svg width={width} height={height} viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_144_353)">
                <path d="M14 1.57355C-2.48979 2.05655 -4.17147 25.1952 11.9112 28.1735H14H16.0888C32.175 25.1924 30.4861 2.05487 14 1.57355Z" fill="#1877F2"/>
                <path d="M16.0888 18.8227H19.2038L19.7965 14.9547H16.0888V12.4445C16.0888 11.3864 16.6068 10.3549 18.2674 10.3549H19.9533V7.06182C16.343 6.41138 12.0055 6.60934 11.9112 12.0066V14.9547H8.51672V18.8227H11.9112V28.1735H14H16.0888V18.8227Z" fill="#F1F1F1"/>
            </g>
            <defs>
                <clipPath id="clip0_144_353">
                    <rect width="28" height="28" fill="white" transform="translate(0 0.873535)"/>
                </clipPath>
            </defs>
        </svg>

    );
}

export default Facebook;
