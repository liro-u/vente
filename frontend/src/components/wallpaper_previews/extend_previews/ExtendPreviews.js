import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";
import { useWallpaperContext } from "../../../hooks/wallpaper/useWallpaperContext";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

// css
import "../../../css/previews.css";
import { useVerifyAuth } from "../../../hooks/auth/useVerifyAuth";
import BubbleSearchBar from "../../searchBar/bubbleSearchBar";
import { useFilterContext } from "../../../hooks/wallpaper/useFilterContext";

const ExtendPreviews = ({ x, title }) => {
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const {verifyAuth} = useVerifyAuth();
    const { likedFilter, newFilter, artistFilter, titleFilter, tagsFilter } = useFilterContext();

    const { wallpapers, noMoreLoad, dispatch } = useWallpaperContext();
    const fetchXWallpaper = async (x, resetIdArray = false) => {
        setIsLoading(true);

        let idArray = []
        if (!resetIdArray){
            idArray = wallpapers.map(({ _id }) => _id)
        }
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
                x,
                filters: {
                    liked: likedFilter,
                    new: newFilter,
                    artist: artistFilter,
                    title: titleFilter,
                    tags: tagsFilter,
                }
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

    useEffect(() => {
        dispatch({type: 'SET_NO_MORE_LOAD', payload: false});
        dispatch({type: 'SET_WALLPAPER', payload: []});
        fetchXWallpaper(x, true)
    }, [likedFilter, newFilter])

    return (
        <div className="extendPreviews extendPreviewsCTN">
            {title && 
                <div className="pageTitleContainer darkSecondaryColor">
                    <h1 className="pageTitle negativeDefaultFontColor">{title}</h1>
                    <div className="searchContainer" >
                        <div className="filterContainer">
                            <BubbleSearchBar className="negativeDefaultFontColor" content="Artist" dispatch_type="" value={artistFilter}/>
                            <BubbleSearchBar className="negativeDefaultFontColor" content="Tags" dispatch_type="" value={tagsFilter}/>
                            <BubbleSearchBar className="negativeDefaultFontColor" content="Title" dispatch_type="" value={titleFilter}/>
                        </div>
                        <div className="sortContainer">
                            <BubbleSearchBar className="negativeDefaultFontColor" color="#FD8A8A99" content="Like" searchBar={false} dispatch_type="SET_LIKED" value={likedFilter}/>
                            <BubbleSearchBar className="negativeDefaultFontColor" color="#B5D5C599" content="New" searchBar={false} dispatch_type="SET_NEW" value={newFilter}/>
                        </div>
                    </div>
                </div>
            }
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