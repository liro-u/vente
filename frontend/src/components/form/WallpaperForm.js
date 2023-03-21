import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "../../components/wallpaper_previews/extend_previews/PreviewBoxDetails";
import { useWallpaperContext } from "../../hooks/context/useWallpaperContext";

//css
import "../../css/previews.css";
import "../../css/form.css";

const WallpaperForm = ({ defaultWallpaper }) => {
    const { dispatch } = useWallpaperContext();

    const titleColors = ["default", "negative-default"];
    const defaultColor = titleColors[0];
    const [method, setMethod] = useState('POST');
    const [url, setUrl] = useState(process.env.REACT_APP_PROXY + '/api/wallpapers');

    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [titleColor, setTitleColor] = useState("");
    const [artistId, setArtistId] = useState("liro_u");

    useEffect(() => {
        if (defaultWallpaper) {
            setTitle(defaultWallpaper.title);
            setSrc(defaultWallpaper.imageLink);
            setTitleColor(defaultWallpaper.titleColor);
            setMethod('PATCH');
            setUrl(process.env.REACT_APP_PROXY + '/api/wallpapers/' + defaultWallpaper._id);
        }
    }, [defaultWallpaper])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const wallpaper = {title, titleColor, artistId, imageLink : src};

        const response = await fetch(url, {
            method,
            body: JSON.stringify(wallpaper),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();

        if (!response.ok) {
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
            alert("Your wallpaper is patch !")
        }
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
                />

                <label>Src :</label>
                <input
                    type="text"
                    onChange={(e) => setSrc(e.target.value)}
                    value={src}
                    className={emptyFields.includes('src') ? 'error' : ''}
                />
                
                <label>Title Color:</label>
                <select
                    onChange={(e) => setTitleColor(e.target.value)}
                    value={titleColor}
                    className={emptyFields.includes('titleColor') ? 'error' : ''}
                >
                    <option value='' hidden disabled>Select one Color</option>
                    {titleColors && titleColors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>

                <button>{method === "POST" ? "Add Wallpaper" : "Patch Wallpaper"}</button>
                {error && <div className="error">{error}</div>}
                
            </form>

            {src && 
                <div className="previewContainer">
                    <PreviewBoxDetails disabled="true" wallpaper={{title, titleColor, artistId, imageLink : src}} />
                    <PreviewBoxDetails disabled="true" wallpaper={{title : "this is a preview, this way, you can see how your wallpaper will appear", titleColor : "negative-default", artistId : "the dev ;)", imageLink : "https://i.pinimg.com/originals/df/4b/d4/df4bd4aace0964217d5a660be614a247.jpg"}} />
                </div>
            }
        </div>
    )
}

export default WallpaperForm;