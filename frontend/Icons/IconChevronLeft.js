import React from 'react';

function IconChevronLeft(props) {

    return(
        
        <svg width="30px" height="51px" viewBox="0 0 30 51" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="filter-1">
                    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.579059 0 0 0 0 0.579059 0 0 0 0 0.579059 0 0 0 1.000000 0"/>
                </filter>
            </defs>
            <g id="Home" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="About" transform="translate(-1066.000000, -1577.000000)">
                    <g id="chevrons-left" transform="translate(271.000000, 1498.000000)" filter="url(#filter-1)">
                        <g transform="translate(796.000000, 80.000000)">
                            <polyline stroke="#000000" strokeWidth="2" points="16.1777778 49 0 24.5 16.1777778 0" />
                            <polyline stroke="#000000" strokeWidth="2" points="28 49 11.8222222 24.5 28 0" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )

}
export default IconChevronLeft;

