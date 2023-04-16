import React from "react";
import {Link} from 'react-router-dom';

// components
import NavbarOffset from "../../components/NavbarOffset";

//css
import "../../css/collection.css";


const Collections = () => {

    return (
        <div className="collection">
            <NavbarOffset/>

            <div className="ImageLol">
            <Link to="/wallpaper/collections/lol" className="">
                    <img className="lol" src="../wallpaper/Collection/LogoThemeLol.jpg" alt="toto"/>
            </Link>
                <div className="Titre">
                League Of Legends
                </div>
            </div>




        </div>
    )
}

export default Collections;