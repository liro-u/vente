import React, { useEffect } from "react";
import { useState } from "react";

const ButtonUnderline = ({ children, onClick,  className , underlineClassName = "lightPrimaryColor", textColorOut = "defaultFontColor", textColorOver = "defaultFontColor", time = 1, borderHeight = 3}) => {
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

    useEffect(() => {
        setTextColor(textColorOut);
    }, [textColorOut]);

    return(
        <div 
            className={"buttonUnderline " + className}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOut}
            onClick={onClick}
        >
            <div 
                className={textColor}
                style={{
                    transition: "color " + time + "s ease-in-out"
                }}
            >{children}</div>
            <div
                className={underlineClassName}
                style={{
                    height: borderHeight + "px",
                    marginBottom: "-" + borderHeight + "px",
                    transition: "width " + time + "s ease-in-out",
                    width: progress + "%",
                }}
            />
        </div>
    )
}

export default ButtonUnderline;