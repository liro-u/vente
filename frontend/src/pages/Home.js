import React, { useState } from "react";

// css
import "../css/home.css";

// components
import ButtonUnderline from "../components/buttons/ButtonUnderline";
import { Link } from "react-router-dom";
import TextApparition from "../components/animations/TextApparition";
import DelayAnimation from "../components/animations/DelayAnimation";
import OrbsParticles from "../components/particles/OrbsParticles";
import Contact from './../components/Contact';
import { useNavbarContext } from "../hooks/navbar/useNavbarContext";

const Home = () => {
    const {dispatch} = useNavbarContext();
    const [contactIsShow, setContactIsShow] = useState(false)

    const toggleShowContact = () => {
        dispatch({type: 'SET_VISIBILITY', payload: contactIsShow});
        setContactIsShow(!contactIsShow)
    }

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
                        <ButtonUnderline onClick={toggleShowContact} underlineClassName="lightPrimaryColor" time="0.2" borderHeight="2">Contact us ➡</ButtonUnderline>
                    </TextApparition>
                </DelayAnimation>
            </div>
            <Contact contactIsShow={contactIsShow} hide={toggleShowContact}/>
        </div>
    )
}

export default Home;