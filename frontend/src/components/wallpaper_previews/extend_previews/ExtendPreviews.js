import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";
import { useWallpaperContext } from "../../../hooks/wallpaper/useWallpaperContext";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

// css
import "../../../css/previews.css";
import { useVerifyAuth } from "../../../hooks/auth/useVerifyAuth";

const ExtendPreviews = ({ x, title }) => {
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const {verifyAuth} = useVerifyAuth();

    const { wallpapers, noMoreLoad, dispatch } = useWallpaperContext();

    const fetchXWallpaper = async (x) => {
        setIsLoading(true);

        let idArray = wallpapers.map(({ _id }) => _id)
        let headers = {
            'Content-type': 'application/json',
        }
        if (user){
            headers.Authorization = `Baerer ${user.token}`
        }
        const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/getX', {
            method: "POST",
            body: JSON.stringify({
                idArray,
                x
            }),
            headers
        });
        const json = await response.json();

        if (response.ok) {
            if (json.length < x) {
                dispatch({type: 'SET_NO_MORE_LOAD', payload: true});
            }
            dispatch({type: 'MERGE_WALLPAPER', payload: json});
        }else{
            if (user){
                verifyAuth(json);
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (wallpapers.length === 0){
            fetchXWallpaper(x)
        }
    }, [x, user])

    return (
        <div className="extendPreviews extendPreviewsCTN">
            {title && <h1 className="pageTitle darkSecondaryColor negativeDefaultFontColor">{title}</h1>}
            {wallpapers && wallpapers.map((wallpaper, index) => (
                <PreviewBoxDetails key={index} wallpaper={wallpaper} isLast={index === wallpapers.length - 1} />
            ))}
            {
                noMoreLoad ? 
                    <h1 className="noMoreContent">There is no more content to pull</h1>
                :
                    !isLoading && <ButtonLoadMore loadMore={fetchXWallpaper} x={x} />
            }
        </div>
    )
}

export default ExtendPreviews;