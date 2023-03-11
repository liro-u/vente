import React from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
// css
import "../../../css/previews.css";

const ExtendPreviews = ({ wallpaperArray }) => {

    return (
        <div className="extendPreviews">
            {wallpaperArray && wallpaperArray.map((wallpaper, index) => (
                <PreviewBoxDetails key={index} wallpaper={wallpaper} />
            ))}
            <div className="loadMoreContainer">
                <div className="loadMore primaryColor">
                    <p>Load More</p>
                    <span class="material-symbols-outlined">expand_more</span>
                </div>
            </div>
        </div>
    )
}

export default ExtendPreviews;