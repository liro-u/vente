import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";

//css
import "../../css/form.css";

const ContactForm = () => {
    const defaultObjects = [
        {msg: 'problem with my command', value: "command"},
        {msg: 'problem with the process of buying', value: "buying"},
        {msg: "other", value: "other"}
    ];
    const {user} = useAuthContext();
    const [isPending, setIsPending] = useState(false)
    const {verifyAuth} = useVerifyAuth();

    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const [email, setEmail] = useState("");
    const [object, setObject] = useState("");
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState("");

    const [objects, setObjects] = useState(defaultObjects);

    useEffect(() => {
        if (user){
            setObjects(defaultObjects)
            if (user.role === 'user'){
                objects.splice(objects.length - 1, 0, {msg: 'Become an official artist', value: "becomeArtist"})
            }else if (user.role === 'artist'){
                objects.splice(objects.length - 1, 0, {msg: 'problem with my art post', value: "artPost"})
            }
        }else{
            setObjects(defaultObjects)
        }
    }, [user, objects])

    const removeClassError = (err) => {
        setEmptyFields(emptyFields.filter((error) => error !== err))
    }

    const handleSubmit = async (e) => {
        setIsPending(true)
        e.preventDefault();

        let headers = {
            'Content-Type': 'application/json',
        }
        
        if (user) {
            headers.Authorization = `Baerer ${user.token}`
        }

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/contact', {
            method: "POST",
            body: JSON.stringify({
                email,
                object,
                subject,
                content
            }),
            headers
        })
        const json = await response.json();

        if (!response.ok) {
            if (user){
                verifyAuth(json);
            }
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        else {
            setError('');
            setEmptyFields([]);

            setEmail('');
            setObject('');
            setSubject('')
            setContent('');
            alert("Your request is in charge of our team")
        }
        setIsPending(false)
    }

    return (
        <div>
            <form className="contactForm" onSubmit={handleSubmit}>
                <h1>Contact Business</h1>
                <h3>Want to ask for something ?</h3>
                <br/><br/><br/>
                <label>Email :</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={emptyFields.includes('email') ? 'error' : ''}
                    onClick={() => removeClassError("email")}
                />

                <label>Object :</label>
                <select
                    onChange={(e) => setObject(e.target.value)}
                    value={object}
                    className={emptyFields.includes('object') ? 'error' : ''}
                    onClick={() => removeClassError("object")}
                >
                    <option value='' hidden disabled>Select a subject</option>
                    {objects && objects.map(({msg, value}) => (
                        <option key={value} value={value}>{msg}</option>
                    ))}
                </select>

                <label>Subject :</label>
                <input
                    type="text"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    className={emptyFields.includes('subject') ? 'error' : ''}
                    onClick={() => removeClassError("subject")}
                />  

                <label>Content :</label>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className={emptyFields.includes('content') ? 'error' : ''}
                    onClick={() => removeClassError("content")}
                />  

                <button disabled={isPending}>Envoyer</button>
                {error && <div className="error">{error}</div>}
                
            </form>
        </div>
    )
}

export default ContactForm;