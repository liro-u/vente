import React, { useEffect, useState } from "react";

// components
import ExtendPreviews from "../components/wallpaper_previews/extend_previews/ExtendPreviews";

const Anime = () => {
    const [wallpaperArray, setWallpaperArray] = useState([]);

    useEffect(() => {
        setWallpaperArray([
            {src: "/wallpaper/9s.jpg", name: "9s soldier", titleColor: "default"},
            {src: "/wallpaper/anime-katana-girl.jpg", name: "anime katana girl", titleColor: "negative-default"},
            {src: "/wallpaper/cloud.jpg", name: "cloud from final fantaisy", titleColor: "negative-default"},
            {src: "/wallpaper/tifa-cloud.jpg", name: "tifa and cloud from final fantaisy", titleColor: "default"},
            {src: "/wallpaper/rose-knight.jpg", name: "rose knight", titleColor: "negative-default"}
        ])
    }, [])

    return (
        <div>
            <ExtendPreviews wallpaperArray={wallpaperArray} />
        </div>
    )
}

export default Anime;