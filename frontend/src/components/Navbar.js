import React from "react";

const NavBar = () => {

    return (
        <header className="primaryColor" id="navbar">
            <img src="/logo/png/logo-no-background.png" alt="erreur" className="logo"/>


            <div className="liens">
                <ul>
                    <li><a href="#">Les Univers</a></li>
                    <li><a href="#">Lien2</a></li>
                    <li><a href="#">Lien3</a></li>
                </ul>
            </div>

            <div className="containerIcon">
                <span className="material-symbols-outlined icon">person</span>
                <span className="material-symbols-outlined icon">shopping_bag</span>
                <span className="material-symbols-outlined icon">bookmark</span>
            </div>

            <script type="text/javascript">


            </script>
        </header>

    )
}
var posBar = window.pageYOffset;
window.onscroll = function () {
    var posBarAtm = window.pageYOffset
    if (posBar > posBarAtm) {
        document.getElementById("navbar").style.top= "0";
    }else{
        document.getElementById("navbar").style.top = "-80px" ;
    }
    if (posBarAtm === 0) {
        document.getElementById("navbar").style.backgroundColor= "transparent";
    }else {
        document.getElementById("navbar").style.backgroundColor= "var(--primary)";
    }
    posBar = posBarAtm;

}


export default NavBar;