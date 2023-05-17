import React from "react";
import {Link} from 'react-router-dom';

// components
import NavbarOffset from "../../components/NavbarOffset";
import Navbar from "../../components/Navbar";

//css
import "../../css/collection.css";


const Collections = () => {

    return (
        <div className="collection">

            <NavbarOffset/>
            <div className="pageTitleContainer ">
                <h1 className="pageTitle">Collections</h1>
            </div>
            <table>
            <tbody>
                <tr>
                    <td>
                        <div className="theme">
                            <div className="Titre">
                                Avengers
                            </div>
                            <Link to="/wallpaper/collections/avengers" className="">
                                <img className="lol" src="../wallpaper/Collection/LogoThemeAvengers.jpg" alt="toto"/>
                            </Link>
                        </div>
                    </td>

                    <td>
                        <div className="theme">
                            <div className="Titre">
                                Convenant Broken
                            </div>
                            <Link to="/wallpaper/collections/lol" className="">
                                <img className="lol" src="../wallpaper/Collection/LogoThemeLol.jpg" alt="toto"/>
                            </Link>
                        </div>

                    </td>

                    <td>
                        <div className="Comming">
                            <img className="Icomming" src="../wallpaper/Collection/LogoThemeZelda.jpg" alt="toto"/>
                            <div className="TComming">
                                Comming Soon ...
                            </div>
                        </div>


                    </td>
                </tr>
                </tbody>
            </table>


        </div>
    )
}

export default Collections;