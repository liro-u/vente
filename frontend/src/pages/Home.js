import React from "react";

// css
import "../css/home.css";

// components
import ButtonUnderline from "../components/buttons/ButtonUnderline";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="home">
            <div 
                className="preview"
                style={{ 
                    backgroundImage: `url("/home/homeWallpaper.jpg")` 
                }}
            >
                <div className="content">
                    <h1 className="title secondaryFont">MadeInome</h1>
                    <h2>Your favorite wallpaper on your wall</h2>
                    <div style={{display: "flex"}}>
                        <ButtonUnderline className="secondaryColor" underlineClassName="lightPrimaryColor" textColorOver="lightPrimaryFont" borderHeight="1">View Gallery</ButtonUnderline>
                        <Link to="/contact" className="cancelLinkCss"><ButtonUnderline underlineClassName="lightPrimaryColor" time="0.2">Contact us ➡</ButtonUnderline></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;