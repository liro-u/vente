import {useAuthContext} from "../auth/useAuthContext";
import {useWallpaperContext} from "../wallpaper/useWallpaperContext";
import {useVerifyAuth} from "../auth/useVerifyAuth";


export const useAddShopping = () => {
    const {user} = useAuthContext();
    const { verifyAuth } = useVerifyAuth();
    const { dispatch } = useWallpaperContext();


    const toggleAddShopping = async (wallpaper, user, quantity, product, isPending, setIsPending) => {


        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/', {
                method: 'POST',
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            })
            const product = await response.json();


        if (response.ok) {
            console.log("cool")
        }else{
            verifyAuth()
            console.log("error")
        }
        setIsPending(false)
        }
    }

    return {toggleAddProduct: toggleAddShopping};
}