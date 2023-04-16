import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/auth/useAuthContext";
import { useShoppingCartContext } from "../../hooks/Purchase/useShoppingCartContext";
import { useReload } from "../../hooks/wallpaper/useReload";


//Components
import Navbar from "../../components/Navbar";
import NavbarOffset from "../../components/NavbarOffset";

//css
import "../../css/shopping.css";

const ShoppingCart = () => {
    const {user} = useAuthContext();
    const { products, dispatch } = useShoppingCartContext();
    
    useEffect(() => {
        const fecthShopping = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/',
                {
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                });
            const shoppingBasket = await response.json();
            dispatch({type: 'SET_PRODUCT', payload: shoppingBasket});
        }
        fecthShopping()
    }, [])


    return (
        <div className="ShoppingCart">

            <Navbar/>
            <NavbarOffset/>
            {(products) &&
            <table><tbody>
                {products.map(({_id, quantity, product, wallpaper}) => (
                    <tr key={_id}>
                        <td><img className="overview" src={wallpaper.imageLink} /></td>
                        <td>
                            <h1>{wallpaper.title} <small>x{quantity}</small></h1>
                            <h2>{product.product} {product.price}€</h2>
                        </td>
                        <td><h2>Total : {product.price * quantity}</h2></td>
                    </tr>
                ))}

            </tbody></table>}

        </div>
    )
}

export default ShoppingCart;