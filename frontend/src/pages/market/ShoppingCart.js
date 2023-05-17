import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/auth/useAuthContext";
import { useShoppingCartContext } from "../../hooks/Purchase/useShoppingCartContext";

//Components
import Navbar from "../../components/Navbar";
import NavbarOffset from "../../components/NavbarOffset";
import ButtonUnderline from "../../components/buttons/ButtonUnderline";
import {useDeleteProducts} from "../../hooks/Purchase/useDeleteProducts";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

//css
import "../../css/shopping.css";


const ShoppingCart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const {user} = useAuthContext();
    const { handleDeleteProducts } = useDeleteProducts();
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('');
    const { products, dispatch } = useShoppingCartContext();
    const {verifyAuth} = useVerifyAuth();
    
    const changeQuantity = async (product, value) => {
        if (!user){
            setError('You must be logged in')
            return
        }

        setIsPending(true)
        let defaultProduct = product
        product.quantity = value
        

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/' + product._id, {
            method: "PATCH",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Baerer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            verifyAuth(json);
            setError(json.error);
        }else{
            dispatch({type: 'REPLACE_PRODUCT', payload: {
                lastProduct: defaultProduct,
                newProduct: product
            }});
        }
        setIsPending(false)
    }
    
    
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
        if (user) {
            fecthShopping()
        }
    }, [user.tokken, user, dispatch])

    useEffect(() => {
        let TotalPriceAcc = 0;
        if (products) {
            products.map(({product, quantity}) =>
                TotalPriceAcc += product.price * quantity
            );
            setTotalPrice(TotalPriceAcc)
        }
    },[products,changeQuantity])





    return (
        <div className="ShoppingCart darkSecondaryColor">
            {(products) &&
            <table><tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td><img className="overview" src={product.wallpaper.imageLink} alt={product.wallpaper.title} /></td>
                        <td>
                            <h1>{product.wallpaper.title} <small>x{product.quantity}</small></h1>
                            <h2>{product.product.product} {product.product.price}€</h2>

                        </td>
                        <td><h2>Total : {product.product.price * product.quantity}</h2></td>
                        <td><select className="quantityStyle" defaultValue={product.quantity} onChange={e => changeQuantity(product, e.target.value)}>
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                            <option value="3"> 3</option>
                            <option value="4"> 4</option>
                            <option value="5"> 5</option>

                        </select></td>

                        <td> <ButtonUnderline underlineClassName = "" textColorOut = "negativeDefaultFontColor" textColorOver = "primaryFont" time="0.2"><span onClick={() => handleDeleteProducts(product, isPending, setIsPending)} className="material-symbols-outlined icon iconFilled">delete</span></ButtonUnderline> </td>



                    </tr>

                ))}



            </tbody>

            </table>}
            <button className="buttonAchat"
                    type="button">
                    Purchase :  {totalPrice.toFixed(2)} €
            </button>

        </div>
    )
}

export default ShoppingCart;