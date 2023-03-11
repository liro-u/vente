import React, { useRef, useState } from "react";

const AnimatedLogo = ({showClass = "show", hideClass = "hide", time = 1.5}) => {
    const [logoTextClasse, setLogoTextClass] = useState("hide")
    const ref = useRef(null)
    
    const showLogo = () => {
        setLogoTextClass(showClass)
    }

    const hideLogo = () => {
        setLogoTextClass(hideClass)
    }

    return (
        <div className="logo">
            <img 
                className="logoPicture"
                alt="erreur"
                src="/logo/icon/circle.png"
                onMouseEnter={showLogo}
                onMouseLeave={hideLogo}
                style={{transition: "all " + time + "s"}}
                ref={ref}
            />
            <img 
                style={{
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight
                }}
                className="fixedLogo"
                alt="erreur"
                src="/logo/icon/M.png"
            />
            <div className="logoTextContainer">
                <div className={"logoText " + logoTextClasse} style={{transition: "all " + time + "s"}}>
                    MadeInome
                </div>
            </div>
        </div>
    )
}

export default AnimatedLogo;