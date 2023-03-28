import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/auth/useAuthContext";
import { useNavbarContext } from "../hooks/navbar/useNavbarContext";
import { useLogout } from '../hooks/auth/useLogout';

// components
import AnimatedLogo from "./animations/Logo";
import ButtonBorderAnimated from "./buttons/ButtonBorderAnimated";
import ButtonUnderline from "./buttons/ButtonUnderline";

const Navbar = () => {
    const [offset, setOffset] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    
    const ref = useRef(null);

    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { height, visible, dispatch } = useNavbarContext();

    useEffect(() => {
        let posBar = window.scrollY;
        dispatch({type: 'SET_HEIGHT', payload: ref.current.offsetHeight});
        window.addEventListener('scroll',  function () {
            dispatch({type: 'SET_HEIGHT', payload: ref.current.offsetHeight});
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

            {user ?
                <div className="containerIcon">
                    {(user.role === 'admin' || user.role === 'artist') && <Link to="/wallpaper/publish"><ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">add</span></ButtonUnderline></Link>}
                    <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">shopping_bag</span></ButtonUnderline>
                    <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon">bookmark</span></ButtonUnderline>
                    <ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2"><span onClick={logout} className="material-symbols-outlined icon">person</span></ButtonUnderline>
                </div>
                :
                <div className="auth" >
                    <Link to="/login" className="cancelLinkCss" ><ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2">Login</ButtonUnderline></Link>
                    <Link to="/signup"className="cancelLinkCss" ><ButtonUnderline underlineClassName = "" textColorOver = "primaryFont" time="0.2">Signup</ButtonUnderline></Link>
                </div>
            }
        </header>

    )
}

export default Navbar;