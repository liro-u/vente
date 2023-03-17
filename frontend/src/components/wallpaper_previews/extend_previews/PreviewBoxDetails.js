import React, { useEffect, useState } from "react";
import TextApparition from "../../animations/TextApparition";

const PreviewBoxDetails = ({wallpaper}) => {
    const [titleColor, setTitleColor] = useState("");

    useEffect(() => {
        switch (wallpaper.titleColor) {
            case "negative-default":
                setTitleColor("negativeDefaultFontColor");
                break;
            default: 
                setTitleColor("defaultFontColor");
        }
    }, [wallpaper.titleColor])

    return (
        <div 
        className="detail-box"
        style={{
            backgroundImage: "url(" + wallpaper.imageLink + ")",
        }}>
            <div className="details">
                <TextApparition visibleClass="showByLeft" hiddenClass="showByLeftBefore">
                    <h1 className={titleColor}>{wallpaper.title} - {wallpaper.artistId}</h1>
                </TextApparition>
            </div>
        </div>
    )
}

export default PreviewBoxDetails;