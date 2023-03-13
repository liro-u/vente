import React, { useState } from "react";

const AnimatedLogo = ({showClass = "show", hideClass = "hide", time = 1.5}) => {
    const [logoTextClasse, setLogoTextClass] = useState("hide")

    const showLogo = () => {setLogoTextClass(showClass)
    }

    const hideLogo = () => {
        setLogoTextClass(hideClass)
    }

    return (
        <div className="logo">
            <img 
                className="logoPicture"
                alt="erreur"
                src="/logo/icon/madeinome-website-favicon-color.png"
                onMouseEnter={showLogo}
                onMouseLeave={hideLogo}
                style={{transition: "all " + time + "s"}}
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