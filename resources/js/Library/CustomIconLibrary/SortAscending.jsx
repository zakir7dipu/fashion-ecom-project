import React from 'react';

function SortAscending(props) {
    const {width, height} = props;
    return (
        <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_379_1432)">
                <path d="M14 16.2494L17.75 19.9994L21.4999 16.25" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.75 10.9993V19.9993" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12.4994H11.7499" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 6.49944H17.7499" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 18.4994H10.25" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_379_1432">
                    <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                </clipPath>
            </defs>
        </svg>

    );
}

export default SortAscending;
