import React, {useEffect, useRef, useState} from "react";
import ButtonUnderline from "../buttons/ButtonUnderline";
import {Link} from "react-router-dom";


import "../../css/ThemeLol.css"


const FlipCard = ({id}) => {

    const [wallpaper, setWallpaper] = useState(null)
    const container = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const TailleImg = useRef(null);

    const handleClick  = () => {
        container.current.classList.toggle('flipCard');
        setHeight(TailleImg.current.offsetHeight)
        /* jE SAIS pas comment setheight et width des le debut pour l'instant faut cliquer une fois*/
        /* setWidth(TailleImg.current.offsetWidth) */

    };

    useEffect(()=>{
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);
        }
        fecthImg(id)
    }, [])

    return (
        <div className="cardContainer" onClick={handleClick}>
            <div className="card" ref={container} style={{height : height /* width : width */}}>
                <div className="flipImg">
                    {wallpaper && <img src={wallpaper.imageLink} alt="toto" ref={TailleImg}/>}
                </div>

                <div className="flipContenu">
                    <div className="TitleCard">
                    {wallpaper && <h3>{wallpaper.title} </h3>}
                    </div>
                    {wallpaper &&
                    <div className="iconBox2">
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined">shopping_cart</span></ButtonUnderline>
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined">favorite</span></ButtonUnderline>
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined">download</span></ButtonUnderline>
                        <Link to={"/wallpaper/edit/" +wallpaper._id} className ="bouton cancelLinkCss"><ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">edit</span></ButtonUnderline></Link>
                        <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline>

                    </div>}

                    <div className="referenceContainer">
                        <p className="reference"> Author : {wallpaper && wallpaper.artistId}</p>
                        <p className="reference"> Published : {wallpaper && wallpaper.createdAt}</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default  FlipCard;