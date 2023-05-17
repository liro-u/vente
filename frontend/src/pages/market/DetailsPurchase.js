import React, {useEffect, useState} from "react";

//Components
import NavbarOffset from "../../components/NavbarOffset";
import {useParams} from "react-router-dom";
import {useNavbarContext} from "../../hooks/navbar/useNavbarContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {useAuthContext} from "../../hooks/auth/useAuthContext";
import {useDownload} from "../../hooks/wallpaper/useDownload";
import {useAddShopping} from "../../hooks/Purchase/useAddShopping";


//css
import "../../css/DetailsPurchase.css"


const DetailsPurchase = () => {

    const [wallpaper, setWallpaper] = useState(null)
    const [products, setProducts] = useState(null)
    const {download} = useDownload();
    const {toggleAddShopping} = useAddShopping();
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
    const [productData, setProductData] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState(1);


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
        for (let i = 0; i < products.length; i++) {
            if (products[i].product === event.target.value) {
                setProductData(products[i])
                setProduct(event.target.value);
                setPrice(products[i].price)
            }
        }

        if (event.target.value === "Wallpaper") {
            setDisplayP("inherit")
            setDisplayW("none")
        } else {
            setDisplayP("none")
            setDisplayW("inherit")
        }


    }

    const Quantity = (event) => {
        setQuantity(event.target.value)
    }


    useEffect(() => {
        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);
        }
        fecthImg(params.id)

        const fetchProduct = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/product',
                {
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                }
            )
            const ContenerProduct = await response.json()

            if (response.ok) {
                setProducts(ContenerProduct);
            } else {
                console.log("erreur")
            }
        }
        if (user) {
            fetchProduct()
        }


    }, [params.id, user, user.tokken])


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

                        <h1 className="Answer">Crafted with pride MadeInome</h1>
                        <h2 className="Title">{wallpaper.title}</h2>

                        <select
                            onChange={ChangeType}
                            className="selectStyle"
                            value={product}
                            onClick={() => removeClassError("object")}
                        >
                            <option value='' hidden disabled>Choose a type of drawing</option>
                            {products.map(({product}) => (
                                <option key={product} value={product}>{product}</option>

                            ))}

                        </select>
                        <div style={{display: displayW}}>
                            <button className="butonDownload"
                                    type="button" onClick={() => download(wallpaper, isPending, setIsPending)}>
                                Download
                            </button>
                        </div>

                        <div style={{display: displayP}}>

                            <p className="price"> {price} €</p>

                            <div className="achat">

                                <button className="buttonAchat"
                                        type="button"
                                        onClick={() => toggleAddShopping(wallpaper, quantity, productData, isPending, setIsPending)}>
                                    Add to cart
                                </button>


                                <select onChange={Quantity} className="quantityStyle">
                                    <option value="1"> 1</option>
                                    <option value="2"> 2</option>
                                    <option value="3"> 3</option>
                                    <option value="4"> 4</option>
                                    <option value="5"> 5</option>

                                </select>



                            </div>


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
