import React from "react";

// components
import NavbarOffset from "../../components/NavbarOffset";

//css
import "../../css/ThemeLol.css"

const ThemeLOL = () => {

    return (

        <div style={{
            backgroundImage : `url("/wallpaper/FondImgThemeLol.png")`
        }}>
            <div className="flip-Card"></div>

            <NavbarOffset />
            <h1>Ceci est la page de la collection League of legends test</h1>
        </div>
    )
}

export default ThemeLOL;