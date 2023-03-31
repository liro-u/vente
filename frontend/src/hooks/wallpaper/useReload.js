import { useState } from 'react';
import { useWallpaperContext } from '../wallpaper/useWallpaperContext';


export const useReload = () => {
    const { wallpapers, dispatch } = useWallpaperContext();
    const [isLoading, setIsLoading] = useState();

    const reloadWallpapers = async (user) => {
        setIsLoading(true);

        let idArray = wallpapers.map(({ _id }) => _id)
        let headers = {
            'Content-type': 'application/json',
        }
        if (user){
            headers.Authorization = `Baerer ${user.token}`
        }
        const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/reloadList', {
            method: "POST",
            body: JSON.stringify({
                idArray
            }),
            headers
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'SET_WALLPAPER', payload: json.wallpapers});
            if (json.error){
                alert(json.error);
            }
        }
        setIsLoading(false);
    }

    return {reloadWallpapers, isLoading};
}