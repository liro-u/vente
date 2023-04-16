import { useState } from 'react';
import { useVerifyAuth } from '../auth/useVerifyAuth';


export const useReload = (wallpapers, dispatch) => {
    const [isLoading, setIsLoading] = useState(false);
    const {verifyAuth} = useVerifyAuth();
    
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
        }else{
            verifyAuth(json);
        }
        setIsLoading(false);
    }

    return {reloadWallpapers, isLoading};
}