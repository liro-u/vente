import React, {useEffect, useRef, useState} from "react";

//Components
import NavbarOffset from "./NavbarOffset";
import {useParams} from "react-router-dom";
import {useNavbarContext} from "../hooks/navbar/useNavbarContext";
//css
import "../css/DetailsPurchase.css"


const DetailsPurchase = () => {

    const [wallpaper, setWallpaper] = useState(null)
    const params = useParams();
    const {dispatch} = useNavbarContext();
    const [visibility, setVisibility] = useState("visible");
    const [isVisible, setIsVisible] = useState(true);
    const [backgroundSize, setBackgroundSize] = useState("cover");
    const [icon, setIcon] = useState("visibility_off");
    const [displayP, setDisplayW] = useState("none");
    const [displayW, setDisplayP] = useState("none");


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

    const ChangeType = (event) => {
        let Type = event.target.children[event.target.selectedIndex].value
        if (Type === "Wallpaper") {
            setDisplayP("inherit")
            setDisplayW("none")
        } else if (Type === "Poster") {
            setDisplayP("none")
            setDisplayW("inherit")
        } else {
            setDisplayP("none")
            setDisplayW("none")
        }

    }

    useEffect(() => {
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);


        }
        fecthImg(params.id)
    }, [params.id])


    return (
        <div className="ContainerDetailsPurchase">
            {wallpaper &&
                <div className="DetailsPurchase" style={{
                    backgroundImage: `url(${wallpaper.imageLink})`,
                    backgroundSize: backgroundSize
                }}>

                    <NavbarOffset/>
                        <span className="material-symbols-outlined iconVisi" onClick={handleClick}> {icon} </span>


                    <div className="details" style={{visibility: visibility}}>

                        <h1>{wallpaper.title}</h1>

                        <select name="type" onChange={ChangeType}>
                            <option value="">--Please choose an option--</option>
                            <option value="Poster">Poster</option>
                            <option value="Wallpaper">Wallpaper</option>
                        </select>

                        <div style={{display: displayW}}>
                            <button className=""
                                    type="button">
                                Download
                            </button>
                        </div>

                        <div style={{display: displayP}}>

                            <p> 20 BALLESS</p>
                            <button className=" "
                                    type="button">
                                Ajouter aux panier
                            </button>

                        </div>


                    </div>

                </div>}

        </div>
    )
}


export default DetailsPurchase;
