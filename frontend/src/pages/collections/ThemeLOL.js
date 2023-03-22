import React from "react";

// components
import NavbarOffset from "../../components/NavbarOffset";
import FlipCard from "../../components/animations/FlipCard";
import OrbsParticles from "../../components/particles/OrbsParticles";

//css


const ThemeLOL = () => {

    return (

        <div className="pages" style={{
            backgroundImage: `url("/wallpaper/FongImgThemeLol.png")`
        }}>
            <OrbsParticles ParticlesOnScreen="50" size = {{min: 3, max: 10}} speedX = {{min: -1.5, max: 1.5}} speedY = {{min: -1.5, max: 1.5}} lifeTime="20" zindex="0"/>

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
