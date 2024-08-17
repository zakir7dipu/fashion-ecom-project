import React from 'react';

function FilterBy(props) {
    const {width, height} = props;
    return (
        <svg width={width} height={height} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5V2.66667L8.5 9.66667V16.6667H12V9.66667L19 2.66667V1.5H1.5Z" stroke="#1A1A1A" strokeWidth="1.8" strokeMiterlimit="10"/>
        </svg>

    );
}

export default FilterBy;
