import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setEmailError('');
        setPasswordError('');
        setGlobalError('');

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {       
            setEmailError(json.errors.email);
            setPasswordError(json.errors.password);
            setGlobalError(json.errors.global);
        }

        if (response.ok) {
            // save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
        }
        setIsLoading(false);
    }

    return {login, isLoading, emailError, passwordError, globalError};
}