import React, {useEffect, useRef, useState} from "react";

//Components
import NavbarOffset from "./NavbarOffset";
import {useParams} from "react-router-dom";
import { useNavbarContext } from "../hooks/navbar/useNavbarContext";
//css
import "../css/DetailsPurchase.css"



const DetailsPurchase = () => {

    const [wallpaper, setWallpaper] = useState(null)
    const params = useParams();
    const {dispatch} = useNavbarContext();
    const [visibility, setVisibility] = useState("visible");
    const [isVisible, setIsVisible] = useState(true);
    const [backgroundSize,setBackgroundSize] = useState("cover");
    const [icon,setIcon] = useState("visibility");


    const handleClick = () => {
        dispatch({type: 'SET_VISIBILITY', payload: !isVisible});
        setIsVisible(!isVisible)
        if (isVisible) {
            setVisibility('hidden');
            setBackgroundSize("contain")
            setIcon("visibility")
        } else {
            setVisibility('visible');
            setBackgroundSize("cover")
            setIcon("visibility_off")

        }
    };

    useEffect(() => {
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);


        }
        fecthImg(params.id)
    }, [params.id])


    return (
        <div className="ContainerDetailsPurchase" >
            {wallpaper &&
            <div className="DetailsPurchase" style={{
                backgroundImage : `url(${wallpaper.imageLink})`,
                backgroundSize : backgroundSize
            }}>

                <NavbarOffset/>
                <div className="iconVisi">
                    <span className="material-symbols-outlined" onClick={handleClick}> {icon} </span>
                </div>


                    <div className="details" style={{visibility: visibility}}>

                        <h1>dssGQDG</h1>
                        <p>dssGQDGdssGQDGdssGQDGdssGQDGdssGQDG</p>


                    </div>

            </div>}

        </div>
    )
}


export default DetailsPurchase;