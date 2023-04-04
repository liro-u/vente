import React from "react";
import WallpaperForm from "../../components/form/WallpaperForm";

const PublishWallpaper = () => {
    
    return (
        <div className="publishWallpaper extendPreviewsCTN darkSecondaryColor negativeDefaultFontColor">
            <h1 className="pageTitle pageTitleContainer">Publish a Wallpaper</h1>
            <WallpaperForm />
        </div>
    )
}

export default PublishWallpaper;