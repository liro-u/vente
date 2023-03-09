import React from "react";
import ButtonUnderline from "./ButtonUnderline";
import "../../css/buttons.css"

const ButtonBorderAnimated = ({children, time="0.3", className=""}) => {

    return (
        <div className={"buttonBorderAnimated " + className} style={{transition: "all " + time + "s"}}>
            <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time={time}>
                {children}
            </ButtonUnderline>
            <svg style={{ pointerEvents: 'none'}}><rect x="0" y="0" width="100%" height="100%"/></svg>
        </div>
    )
}

export default ButtonBorderAnimated;