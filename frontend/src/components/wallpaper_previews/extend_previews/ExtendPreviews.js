import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
// css
import "../../../css/previews.css";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";

const ExtendPreviews = ({ x }) => {

    const [wallpaperArray, setWallpaperArray] = useState([]);
    const [hideLoadMore, setHideLoadMore] = useState(false);

    const fetchXWallpaper = async (x) => {
        let idArray = wallpaperArray.map(({ _id }) => _id)
        const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/getX', {
            method: "POST",
            body: JSON.stringify({
                idArray,
                x
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const json = await response.json();

        if (response.ok) {
            if (json.length < x) {
                console.log(json.length)
                setHideLoadMore(true);
            }
            var newArray = [...wallpaperArray, ...json]
            setWallpaperArray(newArray);
        }
    }

    useEffect(() => {
        fetchXWallpaper(x)
    }, [])

    return (
        <div className="extendPreviews">
            {wallpaperArray && wallpaperArray.map((wallpaper, index) => (
                <PreviewBoxDetails key={index} wallpaper={wallpaper} />
            ))}
            {
                hideLoadMore ? 
                <h1 className="noMoreContent">There is no more content to pull</h1>
                :
                <ButtonLoadMore loadMore={fetchXWallpaper} hideLoadMore={hideLoadMore} x={x} />
            }
        </div>
    )
}

export default ExtendPreviews;