import React, { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

const TextApparition = ({ children, className, style, delay = 0, time = 1, hiddenClass = "showByRightBefore", visibleClass = "showByRight"}) => {
    const ref = useRef(null)
    const isVisible = useOnScreen(ref)

    return (
        <div 
            className={"textApparition " + (isVisible ? visibleClass : hiddenClass) + " " + className} 
            ref={ref} 
            style={{
                ...style,
                transition: "all " + time + "s",
                transitionDelay: delay + "ms" 
            }}
        >
            {children}
        </div>
    )
}

export default TextApparition;