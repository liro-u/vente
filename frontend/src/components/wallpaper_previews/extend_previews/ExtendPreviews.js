import React from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
// css
import "../../../css/previews.css";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";

const ExtendPreviews = ({ wallpaperArray }) => {

    return (
        <div className="extendPreviews">
            {wallpaperArray && wallpaperArray.map((wallpaper, index) => (
                <PreviewBoxDetails key={index} wallpaper={wallpaper} />
            ))}
            <ButtonLoadMore />
        </div>
    )
}

export default ExtendPreviews;