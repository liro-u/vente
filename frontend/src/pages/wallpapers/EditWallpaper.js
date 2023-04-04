import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import WallpaperForm from "../../components/form/WallpaperForm";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const EditWallpaper = () => {
    const {user} = useAuthContext();
    const params = useParams();
    const [wallpaper, setWallpaper] = useState(null)
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchWallpaper = async (id) => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id)
            const json = await response.json();
    
            if (response.ok) {
                setWallpaper(json)
                if (!(user.role === 'admin' || json.artistId === user._id)) {
                    setRedirect(true)
                }
            }
        }
        fetchWallpaper(params.id);
    }, [params.id, user])
    return (
        <div className="editWallpaper extendPreviewsCTN darkSecondaryColor negativeDefaultFontColor">
            {redirect && <Navigate to="/" />}
            <h1 className="pageTitle pageTitleContainer">Edit a Wallpaper</h1>
            <WallpaperForm defaultWallpaper = {wallpaper} />
        </div>
    )
}

export default EditWallpaper;