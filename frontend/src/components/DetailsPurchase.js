import React, {useEffect, useRef, useState} from "react";

//Components
import NavbarOffset from "./NavbarOffset";
import {useParams} from "react-router-dom";
import {useNavbarContext} from "../hooks/navbar/useNavbarContext";


//css
import "../css/DetailsPurchase.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";


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
    const [isPending, setIsPending] = useState(false)


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

                        <h1 className="Answer"> I see you, wretched creature ! </h1>
                        <h2 className="Title">{wallpaper.title}</h2>


                        <select name="type" onChange={ChangeType}>
                            <option value="">--Please choose an option--</option>
                            <option value="Poster">Poster</option>
                            <option value="Wallpaper">Wallpaper</option>
                        </select>

                        <div style={{display: displayW}}>
                            <button className=""
                                    type="button" onClick={download}>
                                Download
                            </button>
                        </div>

                        <div style={{display: displayP}}>

                            <p> 20 BALLESS</p>
                            <button className=" "
                                    type="button" >
                                Ajouter aux panier
                            </button>


                        </div>
                        <div className="reference">
                            <p>Author : {wallpaper.pseudo}</p>
                            <p>Published : {formatDistanceToNow(new Date(wallpaper.createdAt), {addSuffix: true})} </p>
                        </div>

                    </div>

                </div>}

        </div>
    )
}


export default DetailsPurchase;
