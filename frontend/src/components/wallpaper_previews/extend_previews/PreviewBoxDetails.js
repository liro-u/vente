import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWallpaperContext } from '../../../hooks/context/useWallpaperContext';
import TextApparition from "../../animations/TextApparition";
import ButtonUnderline from "../../buttons/ButtonUnderline";

const PreviewBoxDetails = ({wallpaper, disabled=false, isLast=false}) => {
    const { dispatch } = useWallpaperContext();
    const [isPending, setIsPending] = useState(false)

    const [titleColor, setTitleColor] = useState("");
    const [isSelect, setIsSelect] = useState(false);

    const toggleIsSelect = () => {
        setIsSelect(!isSelect);
    }

    const download = async () => {
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
    }

    const handleDelete = async () => {
        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + wallpaper._id, {
                method: 'DELETE'
            })
            const json = await response.json();
    
            if (response.ok) {
                dispatch({type: 'DELETE_WALLPAPER', payload: json});
            }else{
                // if not found on db, delete anyway because maybe was delete by someone else
                dispatch({type: 'DELETE_WALLPAPER', payload: wallpaper});
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
                        <h1 className={titleColor}>{wallpaper.title && wallpaper.title + " - "}{wallpaper.artistId}</h1>
                    </TextApparition>
                </div>
            </div>
            {!disabled && 
            <div className="darkSecondaryColor iconBox"
                style={{
                    height: isSelect ? "100px" : "0",
                    paddingBottom: isLast && isSelect ? "50px" : "0"
                }}
            >
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">shopping_cart</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">favorite</span></ButtonUnderline>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={download} className="material-symbols-outlined icon iconFilled">download</span></ButtonUnderline>
                <Link to={"/wallpaper/edit/" + wallpaper._id} className ="bouton cancelLinkCss"><ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline></Link>
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={handleDelete} className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
            </div>}
        </div>
    )
}

export default PreviewBoxDetails;