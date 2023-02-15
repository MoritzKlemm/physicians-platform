import React from 'react';

function IconEmail(props) {
    return(
        <div className="ab-table-cell-mail-icon">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                display={props.display}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="rgb(33, 96, 148)" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        </div>
    )
    
}

export default IconEmail;