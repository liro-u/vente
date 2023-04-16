import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import NavbarOffset from "../../components/NavbarOffset";
import {useAuthContext} from "../../hooks/auth/useAuthContext";
import {useParams} from "react-router-dom";


//Components

//css

const ShoppingCart = () => {
    const [shopping, setShopping] = useState([])
    const [wallpaper, setWallpaper] = useState(null)
    const [id, setId] = useState(null)
    const [products, setProducts] = useState(null)

    const {user} = useAuthContext();

    useEffect(() => {

        const fecthImg = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setWallpaper(img);
        }
        fecthImg(id)


        const fecthShopping = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/',
                {
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                });
            const shoppingBasket = await response.json()
            setShopping(shoppingBasket)
        }
        fecthShopping()

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
        fetchProduct()


    }, [id])


    return (
        <div className="ShoppingCart">

            <NavbarOffset/>
            {(shopping && wallpaper) &&
            <div>
                {shopping.map(({_id, quantity, productId}) => (
                    <p key={_id}>{_id} Quantité : {quantity} Product : {productId}</p>
                ))}

            </div>}

        </div>
    )
}

export default ShoppingCart;