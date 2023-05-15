import React from "react";

// components
import "../../css/commingSoon.css";

const Artist = () => {

    return (
        <div className="commingSoon">
            <div 
                className="preview" 
                style={{
                    backgroundImage: `url("/comming_soon/mountain.jpg")` 
                }}
            >
                <div className="pageTitleContainer">
                    <div>
                        <h1 className="pageTitle lightPrimaryFont">Artist</h1>
                        <h1 className="sub_title darkPrimaryFont">Comming soon...</h1>
                    </div>
                </div>
            </div>
            



        </div>
    )
}

export default Artist;
