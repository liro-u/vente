import React, {useEffect, useRef, useState} from "react";

// components
import NavbarOffset from "../../components/NavbarOffset";
import FlipCard from "../../components/animations/FlipCard";

//css


const ThemeLOL = () => {

    return (

        <div className="pages" style={{
            backgroundImage: `url("/wallpaper/FongImgThemeLol.png")`
        }}>
            <NavbarOffset />

            <div className="Title">
                <h1> Convenant Broken</h1>
            </div>

            <div className="Content">
            <FlipCard id={"64199c49414876453dec9284"}/>
            <FlipCard id={"64199ca3414876453dec928a"}/>
            <FlipCard id={"64199c86414876453dec9288"}/>
            <FlipCard id={"64199c69414876453dec9286"}/>
            </div>
        </div>
    )
}

export default ThemeLOL;
