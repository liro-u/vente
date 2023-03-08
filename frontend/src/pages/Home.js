import React from "react";

import "../css/home.css";

const Home = () => {

    return (
        <div className="home">
            <div className="preview"
                style={{ 
                    backgroundImage: `url("/home/homeWallpaper.jpg")` 
                }}>
                <div className="content">
                    <h1>MadeInome</h1>
                    <h2>Your favorite wallpaper on your wall</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;