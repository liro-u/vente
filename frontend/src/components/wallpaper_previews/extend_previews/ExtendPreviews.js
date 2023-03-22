import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";
import { useWallpaperContext } from "../../../hooks/context/useWallpaperContext";
// css
import "../../../css/previews.css";

const ExtendPreviews = ({ x, title }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { wallpapers, noMoreLoad, dispatch } = useWallpaperContext();

    const fetchXWallpaper = async (x) => {
        setIsLoading(true);

        let idArray = wallpapers.map(({ _id }) => _id)
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
                console.log(json.length);
                dispatch({type: 'SET_NO_MORE_LOAD', payload: true});
            }
            dispatch({type: 'MERGE_WALLPAPER', payload: json});
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (wallpapers.length === 0){
            fetchXWallpaper(x)
        }
        // eslint-disable-next-line
    }, [x])

    return (
        <div className="extendPreviews extendPreviewsCTN">
            {title && <h1 className="pageTitle darkSecondaryColor negativeDefaultFontColor">{title}</h1>}
            {wallpapers && wallpapers.map((wallpaper, index) => (
                <PreviewBoxDetails key={index} wallpaper={wallpaper} isLast={index === wallpapers.length - 1} />
            ))}
            {
                noMoreLoad ? 
                    isLoading && <h1 className="noMoreContent">There is no more content to pull</h1>
                :
                    <ButtonLoadMore loadMore={fetchXWallpaper} x={x} />
            }
        </div>
    )
}

export default ExtendPreviews;