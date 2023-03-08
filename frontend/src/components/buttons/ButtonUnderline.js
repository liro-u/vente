import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ButtonUnderline = ({ children, className, underlineClassName, textColorOut, textColorOver, time = 1}) => {
    const [progress, setProgress] = useState(0);
    const [textColor, setTextColor] = useState(textColorOut);

    const onMouseOver = () => {
        setProgress(100);
        setTextColor(textColorOver);
    }

    const onMouseOut = () => {
        setProgress(0);
        setTextColor(textColorOut);
    }

    return(
        <div 
            className={"buttonUnderline " + className}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <p 
                className={textColor}
                style={{
                    transition: "color " + time + "s ease-in-out"
                }}
            >{children}</p>
            <div
                className={"underline " + underlineClassName}
                style={{
                    transition: "width " + time + "s ease-in-out",
                    width: progress + "%",
                }}
            />
        </div>
    )
}

export default ButtonUnderline;