import React from "react";
import { Link } from 'react-router-dom';

// components
import NavbarOffset from "../../components/NavbarOffset";

const Collections = () => {

    return (
        <div>
            <NavbarOffset />
            <Link to="/wallpaper/collections/lol" className="cancelLinkCss" ><h1>League of Legends</h1></Link>
            <img src="frontend/public/wallpaper/Collection/LogoThemeLol.jpg" alt="toto"/>
        </div>
    )
}

export default Collections;