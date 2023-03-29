import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWallpaperContext } from '../../../hooks/wallpaper/useWallpaperContext';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import TextApparition from "../../animations/TextApparition";
import ButtonUnderline from "../../buttons/ButtonUnderline";

const PreviewBoxDetails = ({wallpaper, disabled=false, isLast=false}) => {
    const { noMoreLoad, dispatch } = useWallpaperContext();
    const [isPending, setIsPending] = useState(false)

    const [titleColor, setTitleColor] = useState("");
    const [isSelect, setIsSelect] = useState(false);

    const {user} = useAuthContext();

    const toggleIsSelect = () => {
        setIsSelect(!isSelect);
    }

    const toggleLike = async() => {
        if (!user){
            alert('You must be logged in')
            return
        }
        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/like/' + wallpaper._id, {
                method: 'GET',
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            })
            const json = await response.json();
    
            if (response.ok) {
                wallpaper.liked = json.liked
                console.log(json.liked)
            }else{
                console.log("error")
            }
            setIsPending(false)
        }
    }

    const download = async () => {
        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/download', {
                method: "POST",
                body: JSON.stringify({
                    url: wallpaper.imageLink
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const imageBlog = await response.blob()
            const imageURL = URL.createObjectURL(imageBlog)

            const link = document.createElement('a')
            link.href = imageURL;
            link.download = wallpaper.title + ".jpg";

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)  

            setIsPending(false)
        }
    }

    const handleDelete = async () => {
        if (!user){
            alert('You must be logged in')
            return
        }
        if (!isPending) {
            setIsPending(true)
            if (window.confirm("Do you really want to delete this wallpaper ?")) {
                const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + wallpaper._id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                })
                const json = await response.json();
        
                if (response.ok) {
                    dispatch({type: 'DELETE_WALLPAPER', payload: json});
                }else{
                    console.log(json)
                    if (json.error !== "request is not authorized") {
                        // if not found on db, delete anyway because maybe was delete by someone else
                        dispatch({type: 'DELETE_WALLPAPER', payload: wallpaper});
                    }
                }
            }
            setIsPending(false)
        }
    }

    useEffect(() => {
        switch (wallpaper.titleColor) {
            case "negative-default":
                setTitleColor("negativeDefaultFontColor");
                break;
            default: 
                setTitleColor("defaultFontColor");
        }
    }, [wallpaper.titleColor])

    return (
        <div className="previewWallpaper">
            <div 
            className="detail-box"
            style={{
                backgroundImage: "url(" + wallpaper.imageLink + ")",
            }}
            onClick={toggleIsSelect}
            >
                <div className="details bottom">
                    <TextApparition visibleClass="showByLeft" hiddenClass="showByLeftBefore">
                        <h1 className={titleColor}>{wallpaper.title && wallpaper.title + " - "}{wallpaper.pseudo}</h1>
                    </TextApparition>
                </div>
            </div>
            {!disabled && 
            <div className="darkSecondaryColor iconBox flexIconBox"
                style={{
                    height: isSelect ? "100px" : "0",
                    paddingBottom: isLast && isSelect && !noMoreLoad ? "50px" : "0"
                }}
            >
                {user && <div className="flexIconBox">
                    <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">shopping_cart</span></ButtonUnderline>
                    <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={toggleLike} className={"material-symbols-outlined icon iconFilled " + (wallpaper.liked ? "liked" : "")}>favorite</span></ButtonUnderline>
                </div>}
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={download} className="material-symbols-outlined icon iconFilled">download</span></ButtonUnderline>
                {user && (user.role === 'admin' || (user.role === 'artist' && user._id === wallpaper.artistId)) && <div className="flexIconBox">
                    {isPending ?
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                        :
                        <Link to={"/wallpaper/edit/" + wallpaper._id} className ="bouton cancelLinkCss">
                            <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                        </Link>
                    }
                    <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={handleDelete} className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
                </div>}
            </div>}
        </div>
    )
}

export default PreviewBoxDetails;