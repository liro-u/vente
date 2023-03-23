import { useAuthContext } from "./useAuthContext";
import { useWallpaperContext } from "../wallpaper/useWallpaperContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: wallpaperDispatch } = useWallpaperContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
        wallpaperDispatch({ type: 'SET_WALLPAPER', payload: [] });
        wallpaperDispatch({ type: 'SET_NO_MORE_LOAD', payload: false });
    }

    return {logout};
}
