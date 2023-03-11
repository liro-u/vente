import React, { useEffect, useState } from "react";

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
            backgroundImage: "url(" + wallpaper.src + ")",
        }}>
            <div className="details">
                <h1 className={titleColor}>{wallpaper.name}</h1>
            </div>
        </div>
    )
}

export default PreviewBoxDetails;