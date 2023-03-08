import React from "react";

const NavBar = () => {

    return (
        <header className="navbar primaryColor">
            <div className="logo">
                logo a faire
            </div>

            <div className="liens">
                <ul>
                    <li>Les Univers</li>
                    <li>lien2</li>
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

export default NavBar;