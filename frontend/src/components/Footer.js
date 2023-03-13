import React from "react";
import TextApparition from "./animations/TextApparition";

const Footer = () => {

    return (
        <footer className="footer">
            <TextApparition className="negativeDefaultFontColor" hiddenClass="showByLeftBefore" visibleClass="showByLeft" >
                Copyright © MadeInome. All Rights Reserved.
            </TextApparition>
        </footer>
    )
}

export default Footer;