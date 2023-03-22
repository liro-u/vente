import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

// components
import AnimatedLogo from "./animations/Logo";
import ButtonBorderAnimated from "./buttons/ButtonBorderAnimated";
import ButtonUnderline from "./buttons/ButtonUnderline";
import ButtonUnroll from "./buttons/ButtonUnroll";

const Navbar = () => {
    const [offset, setOffset] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    const [height, setHeight] = useState(0);
    
    const ref = useRef(null);

    useEffect(() => {
        let posBar = window.scrollY;
        window.addEventListener('scroll',  function () {
            setHeight(ref.current.offsetHeight)
            const posBarAtm = window.scrollY;
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
        })
    }, [height])

    

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
                    <li><Link to="/wallpaper/discovery" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className="">Discovery</ButtonBorderAnimated>  </Link></li>
                    <li><Link to="/wallpaper/collections" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className="">Collections</ButtonBorderAnimated> </Link></li>
                    <li><Link to="" className ="bouton cancelLinkCss"> <ButtonBorderAnimated className="">Artists</ButtonBorderAnimated> </Link></li>
                </ul>
            </div>

            <div className="containerIcon">
                <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">shopping_bag</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">bookmark</span></ButtonUnderline>
                <ButtonUnroll
                    button={<ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">person</span></ButtonUnderline>}
                    content={
                        <div>
                            <Link to="/wallpaper/publish"><ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">add</span></ButtonUnderline></Link>
                            <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">settings</span></ButtonUnderline>
                        </div>
                    }
                />
            </div>
        </header>

    )
}

export default Navbar;