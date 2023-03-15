import React, { useEffect, useState } from "react";

// components
import ExtendPreviews from "../components/wallpaper_previews/extend_previews/ExtendPreviews";

const Anime = () => {
    const [wallpaperArray, setWallpaperArray] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers');
            const json = await response.json();

            if (response.ok) {
                setWallpaperArray(json);
            }
        }
        fetchExercises()
    }, [])


    return (
        <div>
            <ExtendPreviews wallpaperArray={wallpaperArray} />
        </div>
    )
}

export default Anime;