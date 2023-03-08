import React from "react";

// css
import "../css/home.css";

// components
import ButtonUnderline from "../components/buttons/ButtonUnderline";

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
                    <ButtonUnderline className="secondaryColor" underlineClassName="lightPrimaryColor">See Galery ➡</ButtonUnderline>
                </div>
            </div>
        </div>
    )
}

export default Home;