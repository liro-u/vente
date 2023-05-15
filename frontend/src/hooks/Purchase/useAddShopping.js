import {useAuthContext} from "../auth/useAuthContext";
import {useVerifyAuth} from "../auth/useVerifyAuth";


export const useAddShopping = () => {
    const {user} = useAuthContext();
    const { verifyAuth } = useVerifyAuth();


    const toggleAddShopping = async (wallpaper, quantity, product, isPending, setIsPending) => {

        if (!isPending) {
            setIsPending(true)
            const Shopping = {wallpaperId : wallpaper._id, quantity, productId : product._id}
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/', {
                method: 'POST',
                headers: {
                    'Authorization': `Baerer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(Shopping)
            })
            const json = await response.json();


        if (response.ok) {
            alert("Ajouté au panier !")
        }else{
            verifyAuth(json)
            console.log("error")
        }
        setIsPending(false)
        }
    }

    return {toggleAddShopping};
}