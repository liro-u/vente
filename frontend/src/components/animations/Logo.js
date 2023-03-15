import React, { useEffect, useRef, useState } from "react";

const AnimatedLogo = ({showClass = "show", hideClass = "hide", time = 1}) => {
    const [logoTextClasse, setLogoTextClass] = useState("hide")
    const ref = useRef(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const showLogo = () => {
        setLogoTextClass(showClass)
    }

    const hideLogo = () => {
        setLogoTextClass(hideClass)
    }

    useEffect(() => {
        ref.current.addEventListener('load', (event) => {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        });
    }, []);

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
                    width: width,
                    height: height
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