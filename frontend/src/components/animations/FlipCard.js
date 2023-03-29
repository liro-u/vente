import React, {useEffect, useRef, useState} from "react";
import ButtonUnderline from "../buttons/ButtonUnderline";
import {Link} from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const FlipCard = ({id}) => {

    const [wallpaper, setWallpaper] = useState(null)
    const container = useRef(null);
    const [height, setHeight] = useState(0);
    const TailleImg = useRef(null);


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

                    <div className="flipContenu">
                        <div className="TitleCard">
                            <h3>{wallpaper.title}</h3>
                        </div>

                        <div className="iconBox">
                            <Link to={"/wallpaper/detailspurchase/" + wallpaper._id}
                                  className="">
                                <ButtonUnderline underlineClassName="" textColorOut="negativeDefaultFontColor"
                                                 textColorOver="primaryFont" time="0.2"><span
                                    className="material-symbols-outlined">shopping_cart</span></ButtonUnderline></Link>

                            <ButtonUnderline underlineClassName="" textColorOut="negativeDefaultFontColor"
                                             textColorOver="primaryFont" time="0.2"><span
                                className="material-symbols-outlined">favorite</span></ButtonUnderline>

                            <ButtonUnderline underlineClassName="" textColorOut="negativeDefaultFontColor"
                                             textColorOver="primaryFont" time="0.2"><span
                                className="material-symbols-outlined">download</span></ButtonUnderline>

                            <Link to={"/wallpaper/edit/" + wallpaper._id}
                                  className="bouton cancelLinkCss"><ButtonUnderline underlineClassName=""
                                                                                    textColorOut="negativeDefaultFontColor"
                                                                                    textColorOver="primaryFont"
                                                                                    time="0.2"><span
                                className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline></Link>

                            <ButtonUnderline underlineClassName="" textColorOut="negativeDefaultFontColor"
                                             textColorOver="primaryFont" time="0.2"><span
                                className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>
                        </div>

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