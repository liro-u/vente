import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [offset, setOffset] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    const [height, setHeight] = useState(0);
    
    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref.current.offsetHeight)
    }, [])

    var posBar = window.pageYOffset;
    window.onscroll = function () {
        var posBarAtm = window.pageYOffset
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
                    <li><Link to="" className ="bouton cancelLinkCss">
                        <svg>
                            <rect x="0" y="0" width="100%" height="100%" />
                        </svg>
                        Les Univers </Link></li>

                    <li><Link to="" className ="bouton cancelLinkCss" >
                        <svg>
                            <rect x="0" y="0" width="100%" height="100%" />
                        </svg>
                        Lien2</Link></li>
                    <li><Link to="" className ="bouton cancelLinkCss" >
                        <svg>
                            <rect x="0" y="0" width="100%" height="100%" />
                        </svg>
                        Lien3</Link></li>
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