import { WallpaperContext } from "../../context/WallpaperContext";
import { useContext } from "react";

export const useWallpaperContext = () => {
    const context = useContext(WallpaperContext);

    if (!context) {
        throw Error('useWallpaperContext must be used inside an WallpaperContextProvider');
    }

    return context;
}