import React from "react";

// css
import '../css/contact.css';

const Contact = () => {
    
    return (
        <div className="contact">
            <div className="darkSecondaryColor container">
                <h1>Contact Business</h1>
                <h3>Want to ask for something ?</h3>
                <div className="info">
                    <small className="defaultFontColor">Phone number</small>
                    <div className="phoneInfo">
                        <span class="material-symbols-outlined">call</span>
                        <p>+37 7 67 21 91 63</p>
                    </div>
                </div>
                <div className="info">
                    <small className="defaultFontColor">Send email</small>
                    <div className="phoneInfo">
                        <span class="material-symbols-outlined">email</span>
                        <p>Fill out your details to be contacted</p>
                    </div>
                </div>
            </div>
            <div className="container">
                tt
            </div>
        </div>
    )
}

export default Contact;