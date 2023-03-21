import React, { useState } from "react";

const ButtonUnroll = ({ button, content }) => {

    const [isSelect, setIsSelect] = useState(false);

    const toggleClick = () => {
        setIsSelect(!isSelect)
    }

    return (
        <div className="unroll" onClick={toggleClick}>
            { button }
            <div 
                className="unrolled"
                style={{
                    display: isSelect ? "block" : "none"
                }}
            >
                { content }
            </div>
        </div>
    );
}

export default ButtonUnroll;