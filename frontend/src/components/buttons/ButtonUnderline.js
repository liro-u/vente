import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ButtonUnderline = ({ children, className, underlineClassName}) => {
    const [progress, setProgress] = useState(0);

    const onMouseOver = () => {
        setProgress(100)
    }

    const onMouseOut = () => {
        setProgress(0)
    }

    return(
        <div 
            className={"buttonUnderline " + className}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <p>{children}</p>
            <div
                className={"underline " + underlineClassName}
                style={{
                    width: progress + "%",
                }}
            />
        </div>
    )
}

export default ButtonUnderline;