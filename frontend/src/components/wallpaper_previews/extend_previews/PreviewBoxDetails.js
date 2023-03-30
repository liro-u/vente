import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWallpaperContext } from '../../../hooks/wallpaper/useWallpaperContext';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import TextApparition from "../../animations/TextApparition";
import ButtonUnderline from "../../buttons/ButtonUnderline";
import { useDownload } from "../../../hooks/wallpaper/useDownload";
import { useDelete } from "../../../hooks/wallpaper/useDelete";
import { useLike } from "../../../hooks/wallpaper/useLike";

const PreviewBoxDetails = ({wallpaper, disabled=false, isLast=false}) => {
    const { noMoreLoad } = useWallpaperContext();
    const { download } = useDownload();
    const { handleDelete } = useDelete();
    const {toggleLike } = useLike();
    const [isPending, setIsPending] = useState(false)

    const [titleColor, setTitleColor] = useState("");
    const [isSelect, setIsSelect] = useState(false);

    const {user} = useAuthContext();

    const toggleIsSelect = () => {
        setIsSelect(!isSelect);
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
                    <Link to={"/wallpaper/detailspurchase/" + wallpaper._id}><ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">shopping_cart</span></ButtonUnderline></Link>
                    <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => toggleLike(wallpaper, isPending, setIsPending)} className={"material-symbols-outlined icon iconFilled " + (wallpaper.liked ? "liked" : "")}>favorite</span></ButtonUnderline>
                </div>}
                <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => download(wallpaper, isPending, setIsPending)} className="material-symbols-outlined icon iconFilled">download</span></ButtonUnderline>
                {user && (user.role === 'admin' || (user.role === 'artist' && user._id === wallpaper.artistId)) && <div className="flexIconBox">
                    {isPending ?
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                        :
                        <Link to={"/wallpaper/edit/" + wallpaper._id} className ="bouton cancelLinkCss">
                            <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                        </Link>
                    }
                    <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => handleDelete(wallpaper, isPending, setIsPending)} className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
                </div>}
            </div>}
        </div>
    )
}

export default PreviewBoxDetails;