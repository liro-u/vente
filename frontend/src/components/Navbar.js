import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import AnimatedLogo from "./animations/Logo";
import ButtonBorderAnimated from "./buttons/ButtonBorderAnimated";
import ButtonUnderline from "./buttons/ButtonUnderline";

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
            setBackgroundColor("var(--light-primary)");
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
            <Link to="/" className="cancelLinkCss logoContainer"><AnimatedLogo /></Link>

            <div className="liens">
                <ul>
                    <li><Link to="/wallpaper/test" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className="">Test</ButtonBorderAnimated>  </Link></li>
                    <li><Link to="/wallpaper/theme/lol" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className=""> Les Univers</ButtonBorderAnimated> </Link></li>
                    <li><Link to="" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className=""> Les Univers</ButtonBorderAnimated> </Link></li>
                </ul>
            </div>

            <div className="containerIcon">
                <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.3"><span className="material-symbols-outlined icon">person</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.3"><span className="material-symbols-outlined icon">shopping_bag</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.3"><span className="material-symbols-outlined icon">bookmark</span></ButtonUnderline>
            </div>
        </header>

    )
}

export default Navbar;