import React, {useEffect, useRef, useState} from "react";

//Components
import NavbarOffset from "../../components/NavbarOffset";
import {useParams} from "react-router-dom";
import {useNavbarContext} from "../../hooks/navbar/useNavbarContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {useAuthContext} from "../../hooks/auth/useAuthContext";


//css
import "../../css/DetailsPurchase.css"



const DetailsPurchase = () => {

    const [wallpaper, setWallpaper] = useState(null)
    const [products, setProducts] = useState(null)
    const {user} = useAuthContext();
    const params = useParams();
    const {dispatch} = useNavbarContext();
    const [visibility, setVisibility] = useState("visible");
    const [isVisible, setIsVisible] = useState(true);
    const [backgroundSize, setBackgroundSize] = useState("cover");
    const [icon, setIcon] = useState("visibility_off");
    const [displayP, setDisplayW] = useState("none");
    const [displayW, setDisplayP] = useState("none");
    const [isPending, setIsPending] = useState(false);
    const [product, setProduct] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const [price, setPrice] = useState();


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

        setProduct(event.target.value);
        {console.log(event.target.value)}

        if (event.target.value === "wallpaper") {
            setDisplayP("inherit")
            setDisplayW("none")
        } else {
            setDisplayP("none")
            setDisplayW("inherit")
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].product === event.target.value ) {
                setPrice(products[i].price)
            }
        }
        

    }


    useEffect(() => {
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);
        }
        fecthImg(params.id)

        const fetchProduct = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/product',
            {headers: {
                'Authorization': `Baerer ${user.token}`
            }}
            )

            const ContenerProduct = await response.json()

            if (response.ok) {

                setProducts(ContenerProduct);
            }else{
                console.log("erreur")
            }
        }
        fetchProduct()
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


    const removeClassError = (err) => {
        setEmptyFields(emptyFields.filter((error) => error !== err))
    }





    return (
        <div className="ContainerDetailsPurchase">
            {(wallpaper && products) &&
                <div className="DetailsPurchase" style={{
                    backgroundImage: `url(${wallpaper.imageLink})`,
                    backgroundSize: backgroundSize
                }}>

                    <NavbarOffset/>
                    <span className="material-symbols-outlined iconVisi" onClick={handleClick}> {icon} </span>


                    <div className="details" style={{visibility: visibility}}>

                        <h1 className="Answer"> I see you, wretched creature ! </h1>
                        <h2 className="Title">{wallpaper.title}</h2>

                        <select
                            onChange={ChangeType}
                            value={product}
                            className={emptyFields.includes('object') ? 'error' : ''}
                            onClick={() => removeClassError("object")}
                        >
                            <option value='' hidden disabled>Choose a type of drawing</option>
                            {products.map(({product}) => (
                                <option key={product} value={product}>{product}</option>

                            ))}

                        </select>
                        <div style={{display: displayW}}>
                            <button className=""
                                    type="button" onClick={download}>
                                Download
                            </button>
                        </div>

                        <div style={{display: displayP}}>

                            <p> {price} </p>
                            <button className=""
                                    type="button">
                                Ajouter aux panier
                            </button>


                        </div>


                        <div className="reference">
                            <p>Author : {wallpaper.pseudo}</p>
                            <p>Published : {formatDistanceToNow(new Date(wallpaper.createdAt), {addSuffix: true})} </p>
                        </div>

                    </div>

                    {products.map(({product, price}) => (
                        <option key={product} value={product}>{product} et {price}</option>
                    ))}

                </div>}

        </div>
    )
}


export default DetailsPurchase;
