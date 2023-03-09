import React from "react";

const ButtonBorderAnimated = ({
                                  children,
                              }) => {


    return (
        <div>
            <svg>
                <rect x="0" y="0" width="100%" height="100%"/>
            </svg>
            {children}
        </div>
    )
}

export default ButtonBorderAnimated;