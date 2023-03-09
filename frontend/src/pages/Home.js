import React from "react";

// css
import "../css/home.css";

// components
import ButtonUnderline from "../components/buttons/ButtonUnderline";
import { Link } from "react-router-dom";
import TextApparition from "../components/animations/TextApparition";
import DelayAnimation from "../components/animations/DelayAnimation";

const Home = () => {

    return (
        <div className="home">
            <div 
                className="preview"
                style={{ 
                    backgroundImage: `url("/home/homeWallpaper.jpg")` 
                }}
            >
                <DelayAnimation className="content">
                    <TextApparition><h1 className="title secondaryFont">MadeInome</h1></TextApparition>
                    <TextApparition hiddenClass="showByLeftBefore" visibleClass="showByLeft"    ><h2>Your favorite wallpaper on your wall</h2></TextApparition>
                    <TextApparition style={{display: "flex"}}>
                        <ButtonUnderline className="secondaryColor" underlineClassName="lightPrimaryColor" textColorOver="lightPrimaryFont" borderHeight="1">View Gallery</ButtonUnderline>
                        <Link to="/contact" className="cancelLinkCss"><ButtonUnderline underlineClassName="lightPrimaryColor" time="0.2">Contact us ➡</ButtonUnderline></Link>
                    </TextApparition>
                </DelayAnimation>
            </div>
        </div>
    )
}

export default Home;