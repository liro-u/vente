import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "../../components/wallpaper_previews/extend_previews/PreviewBoxDetails";
import { useWallpaperContext } from "../../hooks/wallpaper/useWallpaperContext";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

//css
import "../../css/previews.css";
import "../../css/form.css";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

const WallpaperForm = ({ defaultWallpaper }) => {
    const {user} = useAuthContext();
    const { dispatch } = useWallpaperContext();
    const [isPending, setIsPending] = useState(false)
    const {verifyAuth} = useVerifyAuth();

    const titleColors = ["default", "negative-default"];
    const defaultColor = titleColors[0];
    const [method, setMethod] = useState('POST');
    const [url, setUrl] = useState(process.env.REACT_APP_PROXY + '/api/wallpapers');

    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [titleColor, setTitleColor] = useState("");

    useEffect(() => {
        if (defaultWallpaper) {
            setTitle(defaultWallpaper.title);
            setSrc(defaultWallpaper.imageLink);
            setTitleColor(defaultWallpaper.titleColor);
            setMethod('PATCH');
            setUrl(process.env.REACT_APP_PROXY + '/api/wallpapers/' + defaultWallpaper._id);
        }
    }, [defaultWallpaper])

    const removeClassError = (err) => {
        setEmptyFields(emptyFields ? emptyFields.filter((error) => error !== err) : [])
    }

    const handleSubmit = async (e) => {
        if (!user){
            setError('You must be logged in')
            return
        }

        setIsPending(true)
        e.preventDefault();

        const wallpaper = {title, titleColor, imageLink : src};

        const response = await fetch(url, {
            method,
            body: JSON.stringify(wallpaper),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Baerer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            verifyAuth(json);
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        else if (method === "POST") {
            dispatch({type: 'SET_NO_MORE_LOAD', payload: false});
            setError('');
            setEmptyFields([]);
            setTitle('');
            setSrc('');
            setTitleColor(defaultColor);
            alert("Your wallpaper is online !")
        }else{
            dispatch({type: 'REPLACE_WALLPAPER', payload: {
                lastWallpaper: defaultWallpaper,
                newWallpaper: json
            }});
            alert("Your wallpaper is patch !")
        }
        setIsPending(false)
    }

    return (
        <div>
            <form className="wallpaperForm" onSubmit={handleSubmit}>
                <label>Title :</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                    onClick={() => removeClassError("title")}
                />

                <label>Src :</label>
                <input
                    type="text"
                    onChange={(e) => setSrc(e.target.value)}
                    value={src}
                    className={emptyFields.includes('src') ? 'error' : ''}
                    onClick={() => removeClassError("src")}
                />
                
                <label>Title Color:</label>
                <select
                    onChange={(e) => setTitleColor(e.target.value)}
                    value={titleColor}
                    className={emptyFields.includes('titleColor') ? 'error' : ''}
                    onClick={() => removeClassError("titleColor")}
                >
                    <option value='' hidden disabled>Select one Color</option>
                    {titleColors && titleColors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>

                <button disabled={isPending}>{method === "POST" ? "Add Wallpaper" : "Patch Wallpaper"}</button>
                {error && <div className="error">{error}</div>}
                
            </form>

            {src && user &&
                <div className="previewContainer">
                    <PreviewBoxDetails disabled="true" wallpaper={{title, titleColor, pseudo: user.pseudo, imageLink : src}} />
                    <PreviewBoxDetails disabled="true" wallpaper={{title : "this is a preview, this way, you can see how your wallpaper will appear", titleColor : "negative-default", artistId : "the dev ;)", imageLink : "https://i.pinimg.com/originals/df/4b/d4/df4bd4aace0964217d5a660be614a247.jpg"}} />
                </div>
            }
        </div>
    )
}

export default WallpaperForm;