import React from 'react';

const Button = ({ children, ...props }) => {
    return (
        <>
            <button {...props}>              
                {children}
            </button>
            <style jsx>{` 
                button {
                height: 2rem;
                border-radius: 4px;
                cursor: pointer;
                position: relative;
                padding: 0 20px;
                line-height: 2rem;
                outline: 0;
                border: solid 1px #ff8713;
                background: transparent;
                color: #ff8713;
                }

                button:hover {
                color: #fff;
                background: #ff8713;
                }
            `}</style>
        </>
    );
}

export default Button;