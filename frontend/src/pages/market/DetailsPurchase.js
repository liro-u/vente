import React, {useEffect, useRef, useState} from "react";

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
    const { download } = useDownload();
    const { toggleAddProduct } = useAddShopping();
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
    const [AddProduct, setAddProduct] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState(0);


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

        const fetchProduct = async () => {
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

        const fetchUserAddProducts = async() => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            })
            const ContenerAddProducts = await response.json()

            if (response.ok) {
                setAddProduct(ContenerAddProducts);
                console.log(ContenerAddProducts)
            }else{
                console.log("erreur")
            }
        }
        fetchUserAddProducts()


    }, [params.id])




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
                                    type="button" onClick={() => download(wallpaper, isPending, setIsPending)}>
                                Download
                            </button>
                        </div>

                        <div style={{display: displayP}}>

                            <p> {price} </p>
                            <button className=""
                                    type="button" onClick={() => toggleAddProduct(wallpaper, isPending, setIsPending, user, quantity, product)}>
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
