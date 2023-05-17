import { useState } from "react";
import { useAuthContext } from "./../auth/useAuthContext";
import { useWallpaperContext } from "../wallpaper/useWallpaperContext";
import { useReload } from "../wallpaper/useReload";

export const useEditProfile = () => {
    const [pseudoError, setPseudoError] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, dispatch } = useAuthContext();
    const { wallpapers, dispatch: wallpaperDispatch } = useWallpaperContext();
    const { reloadWallpapers } = useReload(wallpapers, wallpaperDispatch);


    const saveChange = async (pseudo) => {
        setIsLoading(true);
        setPseudoError('');
        setGlobalError('');

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/user/edit', {
            method: 'PATCH',
            body: JSON.stringify({pseudo}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Baerer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {       
            setPseudoError(json.errors.pseudo);
            setGlobalError(json.errors.global);
        }

        if (response.ok) {
            const new_user = {
                ...user,
                ...json
            }

            // reload wallpapers
            reloadWallpapers(new_user);

            localStorage.setItem('user', JSON.stringify(new_user));

            // update the auth context
            dispatch({type: 'LOGIN', payload: new_user})

            alert('Your profile is fresh new !')
        }
        setIsLoading(false);
    }

    return {saveChange, isLoading, pseudoError, globalError};
}