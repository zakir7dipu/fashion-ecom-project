import React from 'react';

function Youtube(props) {
    const {width, height} = props
    return (
        <svg width={width} height={height} viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_144_370)">
                <path d="M28 14.8735C28 7.14155 21.732 0.873535 14 0.873535C6.26801 0.873535 0 7.14155 0 14.8735C0 22.6055 6.26801 28.8735 14 28.8735C21.732 28.8735 28 22.6055 28 14.8735Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20.8471 9.12192C21.5967 9.3237 22.1877 9.91473 22.3896 10.6643C22.7643 12.0337 22.7499 14.8879 22.7499 14.8879C22.7499 14.8879 22.7499 17.7277 22.3896 19.0972C22.1877 19.8467 21.5967 20.4378 20.8471 20.6395C19.4777 20.9999 13.9999 20.9999 13.9999 20.9999C13.9999 20.9999 8.53662 20.9999 7.15277 20.6251C6.40319 20.4233 5.81219 19.8323 5.61038 19.0827C5.25 17.7277 5.25 14.8735 5.25 14.8735C5.25 14.8735 5.25 12.0337 5.61038 10.6643C5.81219 9.91473 6.4176 9.30929 7.15277 9.10746C8.52221 8.74713 13.9999 8.74713 13.9999 8.74713C13.9999 8.74713 19.4777 8.74713 20.8471 9.12192ZM16.8109 14.8735L12.2557 17.4971V12.25L16.8109 14.8735Z" fill="#FF3131"/>
            </g>
            <defs>
                <clipPath id="clip0_144_370">
                    <rect width="28" height="28" fill="white" transform="translate(0 0.873535)"/>
                </clipPath>
            </defs>
        </svg>

    );
}

export default Youtube;
