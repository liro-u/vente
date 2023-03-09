import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import ButtonBorderAnimated from "./buttons/ButtonBorderAnimated";

const Navbar = () => {
    const [offset, setOffset] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    const [height, setHeight] = useState(0);
    
    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref.current.offsetHeight)
    }, [])

    var posBar = window.scrollY;
    window.onscroll = function () {
        var posBarAtm = window.scrollY
        // position transition
        if (posBar > posBarAtm) {
            setOffset(0);
        } else {
            setOffset(-height);
        }
        // color transition
        if (posBarAtm === 0) {
            setBackgroundColor("transparent");
        } else {
            setBackgroundColor("var(--primary)");
        }
        posBar = posBarAtm;
    }

    return (
        <header 
            className="primaryColor navbar"
            ref={ref}
            style={{
                top: offset + "px",
                backgroundColor: backgroundColor
            }}
        >
            <Link to="/" className="cancelLinkCss logoContainer"><img src="/logo/icon/madeinome-website-favicon-color.png" alt="erreur" className="logo"/></Link>

            <div className="liens">
                <ul>
                    <li><Link to="" className ="bouton cancelLinkCss"> <ButtonBorderAnimated> Les Univers</ButtonBorderAnimated>  </Link></li>

                    <li><Link to="" className ="bouton cancelLinkCss" > <ButtonBorderAnimated> Les Univers</ButtonBorderAnimated> </Link></li>
                    <li><Link to="" className ="bouton cancelLinkCss" > <ButtonBorderAnimated> Les Univers</ButtonBorderAnimated> </Link></li>
                </ul>
            </div>

            <div className="containerIcon">
                <span className="material-symbols-outlined icon">person</span>
                <span className="material-symbols-outlined icon">shopping_bag</span>
                <span className="material-symbols-outlined icon">bookmark</span>
            </div>
        </header>

    )
}

export default Navbar;