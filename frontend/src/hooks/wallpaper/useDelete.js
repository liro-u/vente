import { useAuthContext } from '../auth/useAuthContext';
import { useVerifyAuth } from '../auth/useVerifyAuth';
import { useWallpaperContext } from '../wallpaper/useWallpaperContext';


export const useDelete = () => {
    const {user} = useAuthContext();
    const { dispatch } = useWallpaperContext();
    const { verifyAuth } = useVerifyAuth();


    const handleDelete = async (wallpaper, isPending, setIsPending) => {
        if (!user){
            alert('You must be logged in')
            return
        }
        if (!isPending) {
            setIsPending(true)
            if (window.confirm("Do you really want to delete this wallpaper ?")) {
                const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + wallpaper._id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                })
                const json = await response.json();
        
                if (response.ok) {
                    dispatch({type: 'DELETE_WALLPAPER', payload: json});
                }else{
                    verifyAuth(json);
                    console.log(json)
                    if (json.error !== "request is not authorized") {
                        // if not found on db, delete anyway because maybe was delete by someone else
                        dispatch({type: 'DELETE_WALLPAPER', payload: wallpaper});
                    }
                }
            }
            setIsPending(false)
        }
    }

    return {handleDelete};
}