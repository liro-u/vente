import React, { useEffect } from "react";
import ContactForm from "./form/ContactForm";
import NavbarOffset from "./NavbarOffset";

// css
import '../css/contact.css';

const Contact = ({contactIsShow, hide}) => {
    
    return (
        <div 
            className="contact"
            style={{
                pointerEvents: contactIsShow ? "all" : "none",
                left: contactIsShow ? 0 : "-50%"
            }}
        >
            <div className="darkSecondaryColor">
                <NavbarOffset />
                <div className="container">
                    <ContactForm />
                </div>
            </div>
            <div 
                className="hideContact"
                onClick={hide}
            >

            </div>
        </div>
    )
}

export default Contact;