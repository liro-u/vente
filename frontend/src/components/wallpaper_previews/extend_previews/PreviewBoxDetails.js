import React, { useEffect, useState } from "react";
import TextApparition from "../../animations/TextApparition";
import ButtonUnderline from "../../buttons/ButtonUnderline";

const PreviewBoxDetails = ({wallpaper}) => {
    const [titleColor, setTitleColor] = useState("");
    const [isSelect, setIsSelect] = useState(false);

    const toggleIsSelect = () => {
        setIsSelect(!isSelect);
    }

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
        <div className="previewWallpaper">
            <div 
            className="detail-box"
            style={{
                backgroundImage: "url(" + wallpaper.imageLink + ")",
            }}
            onClick={toggleIsSelect}
            >
                <div className="details bottom">
                    <TextApparition visibleClass="showByLeft" hiddenClass="showByLeftBefore">
                        <h1 className={titleColor}>{wallpaper.title && wallpaper.title + " - "}{wallpaper.artistId}</h1>
                    </TextApparition>
                </div>
            </div>
            {isSelect &&
            <div className="darkSecondaryColor iconBox">
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">shopping_cart</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">favorite</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">download</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
            </div>}
        </div>
    )
}

export default PreviewBoxDetails;