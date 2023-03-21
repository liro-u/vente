import React, { useState } from "react";
import PreviewBoxDetails from "../components/wallpaper_previews/extend_previews/PreviewBoxDetails";

//css
import "../css/previews.css";
import "../css/form.css";

const PublishWallpaper = () => {
    const titleColors = ["default", "negative-default"];
    const defaultColor = titleColors[0];

    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [titleColor, setTitleColor] = useState(defaultColor);
    const [artistId, setArtistId] = useState("liro_u");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const wallpaper = {title, titleColor, artistId, imageLink : src};

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers', {
            method: 'POST',
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
        if (response.ok) {
            setError('');
            setEmptyFields([]);
            setTitle('');
            setSrc('');
            setTitleColor(defaultColor);
            alert("Your wallpaper is online !")
        }
    }

    return (
        <div className="publishWallpaper extendPreviewsCTN darkSecondaryColor negativeDefaultFontColor">
            <h1 className="pageTitle">Publish a Wallpaper</h1>
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

                <button>Add Wallpaper</button>
                {error && <div className="error">{error}</div>}
                
            </form>

            {src && 
                <div className="previewContainer">
                    <PreviewBoxDetails wallpaper={{title, titleColor, artistId, imageLink : src}} />
                    <PreviewBoxDetails wallpaper={{title : "this is a preview, this way, you can see how your wallpaper will appear", titleColor : "negative-default", artistId : "the dev ;)", imageLink : "https://i.pinimg.com/originals/df/4b/d4/df4bd4aace0964217d5a660be614a247.jpg"}} />
                </div>
            }
        </div>
    )
}

export default PublishWallpaper;