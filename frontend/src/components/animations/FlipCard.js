import React, {useEffect, useRef, useState} from "react";
import ButtonUnderline from "../buttons/ButtonUnderline";
import {Link, useNavigate} from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {useAuthContext} from "../../hooks/auth/useAuthContext";
import {useDownload} from "../../hooks/wallpaper/useDownload";
import {useLike} from "../../hooks/wallpaper/useLike";
import {useDelete} from "../../hooks/wallpaper/useDelete";
import {is} from "date-fns/locale";


const FlipCard = ({id}) => {

    const [wallpaper, setWallpaper] = useState(null)
    const container = useRef(null);
    const [height, setHeight] = useState(0);
    const TailleImg = useRef(null);
    const [isPending, setIsPending] = useState(false)
    const {user} = useAuthContext();
    const { download } = useDownload();
    const [isSelect, setIsSelect] = useState(false);
    const navigate  = useNavigate();
    const { handleDelete } = useDelete();
    const {toggleLike } = useLike();


    const toggleIsSelect = () => {
        setIsSelect(!isSelect);
    }

    const redirect = () => {
        navigate('/login');
    }


    const handleLikeClickLike = (e) => {
        e.stopPropagation();
    };

    const handleClick = () => {
        container.current.classList.toggle('flipCard');
    };

    const handleRes123 = () => {
        if (TailleImg.current) {
            setHeight(TailleImg.current.offsetHeight)
        }
    }

    useEffect(() => {
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);
        }
        fecthImg(id)
        window.addEventListener("resize", handleRes123)
    }, [id])


    return (
        <div className="cardContainer" onClick={handleClick}>
            {wallpaper &&
                <div className="card" ref={container} style={{height: height}}>
                    <div className="flipImg">
                        <img onLoad={() => (handleRes123())} src={wallpaper.imageLink} alt={wallpaper.title}
                             ref={TailleImg}/>
                    </div>

                    <div className="flipContenu" >
                        <div className="TitleCard">
                            <h3>{wallpaper.title}</h3>
                        </div>

                        <div className="iconBox">
                            <Link to={"/wallpaper/detailspurchase/" + wallpaper._id}
                                  className="">
                                <ButtonUnderline className="paddingicon" underlineClassName="" textColorOut="negativeDefaultFontColor"
                                                 textColorOver="primaryFont" time="0.2"><span
                                    className="material-symbols-outlined icon">shopping_cart</span></ButtonUnderline></Link>

                            <ButtonUnderline onClick={handleLikeClickLike} className="paddingicon" underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2">
                                <span onClick={() => user ? toggleLike(wallpaper, isPending, setIsPending) : redirect()} className={"material-symbols-outlined icon iconFilled " + (wallpaper.liked ? "liked" : "")}>favorite</span></ButtonUnderline>

                            <ButtonUnderline  className="paddingicon"  underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => download(wallpaper, isPending, setIsPending)} className="material-symbols-outlined icon iconFilled">download</span></ButtonUnderline>
                        </div>

                            {user && (user.role === 'admin' || (user.role === 'artist' && user._id === wallpaper.artistId)) && <div className="flexIconBox">
                                {isPending ?
                                    <ButtonUnderline className="paddingicon"  underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                                    :
                                    <Link to={"/wallpaper/edit/" + wallpaper._id} className ="bouton cancelLinkCss">
                                        <ButtonUnderline  className="paddingicon"  underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline>
                                    </Link>
                                }
                                <ButtonUnderline className="paddingicon"  underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => handleDelete(wallpaper, isPending, setIsPending)} className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
                            </div>}


                        <div className="referenceContainer">
                            <p className="reference"> Author : {wallpaper.pseudo}</p>
                            <p className="reference"> Published {formatDistanceToNow(new Date(wallpaper.createdAt), {addSuffix: true})}</p>
                        </div>


                    </div>
                </div>}
        </div>
    )
}

export default FlipCard;