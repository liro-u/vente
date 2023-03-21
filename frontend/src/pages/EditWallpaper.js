import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WallpaperForm from "../components/form/WallpaperForm";

const EditWallpaper = () => {
    const params = useParams();
    const [wallpaper, setWallpaper] = useState(null)

    useEffect(() => {
        const fetchWallpaper = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id)
            const json = await response.json();
    
            if (response.ok) {
                setWallpaper(json)
            }
        }
        fetchWallpaper(params.id);
    }, [params.id])
    return (
        <div className="editWallpaper extendPreviewsCTN darkSecondaryColor negativeDefaultFontColor">
            <h1 className="pageTitle">Edit a Wallpaper</h1>
            <WallpaperForm defaultWallpaper = {wallpaper} />
        </div>
    )
}

export default EditWallpaper;