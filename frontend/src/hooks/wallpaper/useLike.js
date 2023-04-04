import { useAuthContext } from '../auth/useAuthContext';
import { useWallpaperContext } from '../wallpaper/useWallpaperContext';
import { useVerifyAuth } from '../auth/useVerifyAuth';


export const useLike = () => {
    const {user} = useAuthContext();
    const { dispatch } = useWallpaperContext();
    const { verifyAuth } = useVerifyAuth();

    const toggleLike = async(wallpaper, isPending, setIsPending) => {
        if (!user){
            alert('You must be logged in')
            return
        }
        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/like/' + wallpaper._id, {
                method: 'GET',
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            })
            const json = await response.json();
    
            if (response.ok) {
                let newWallpaper = wallpaper
                newWallpaper.liked = json.liked
                dispatch({type: 'REPLACE_WALLPAPER', payload: {
                    lastWallpaper: wallpaper,
                    newWallpaper: newWallpaper
                }});
                console.log(json.liked)
            }else{
                verifyAuth()
                console.log("error")
            }
            setIsPending(false)
        }
    }

    return {toggleLike};
}