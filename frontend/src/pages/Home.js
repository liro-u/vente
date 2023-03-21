import React from "react";

// css
import "../css/home.css";

// components
import ButtonUnderline from "../components/buttons/ButtonUnderline";
import { Link } from "react-router-dom";
import TextApparition from "../components/animations/TextApparition";
import DelayAnimation from "../components/animations/DelayAnimation";
import OrbsParticles from "../components/particles/OrbsParticles";

const Home = () => {

    return (
        <div className="home">
            <OrbsParticles ParticlesOnScreen="30"/>
            <OrbsParticles ParticlesOnScreen="3" size = {{min: 20, max: 50}} speedX = {{min: -5, max: 5}} speedY = {{min: -12, max: 0}} lifeTime="20"/>
            <div 
                className="preview"
                style={{ 
                    backgroundImage: `url("/home/homeWallpaper.jpg")` 
                }}
            >
                <DelayAnimation className="content">
                    <TextApparition><h1 className="title secondaryFont">MadeInome</h1></TextApparition>
                    <TextApparition hiddenClass="showByLeftBefore" visibleClass="showByLeft"><h2>Your favorite wallpaper on your wall</h2></TextApparition>
                    <TextApparition style={{display: "flex"}}>

                        <Link to="/wallpaper/discovery" className="cancelLinkCss"><ButtonUnderline className="secondaryColor" underlineClassName="lightPrimaryColor" textColorOver="lightPrimaryFont" time="0.2" borderHeight="2">View Gallery</ButtonUnderline></Link>
                        <Link to="/contact" className="cancelLinkCss"><ButtonUnderline underlineClassName="lightPrimaryColor" time="0.2" borderHeight="2">Contact us ➡</ButtonUnderline></Link>
                    </TextApparition>
                </DelayAnimation>
            </div>
        </div>
    )
}

export default Home;