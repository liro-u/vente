import {useAuthContext} from "../auth/useAuthContext";
import {useWallpaperContext} from "../wallpaper/useWallpaperContext";
import {useVerifyAuth} from "../auth/useVerifyAuth";


export const useAddShopping = () => {
    const {user} = useAuthContext();
    const { verifyAuth } = useVerifyAuth();


    const toggleAddShopping = async (wallpaper, quantity, product, isPending, setIsPending) => {

        if (!isPending) {
            setIsPending(true)
            console.log(product)
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
            console.log("cool")
        }else{
            verifyAuth(json)
            console.log("error")
        }
        setIsPending(false)
        }
    }

    return {toggleAddShopping};
}