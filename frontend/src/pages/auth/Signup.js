import React from "react";
import { useState } from "react";
import { useSignup } from "../../hooks/auth/useSignup";

// components
import NavbarOffset from '../../components/NavbarOffset'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, emailError, passwordError, globalError, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <NavbarOffset />
            <h1>Sign up</h1>

            <label>Email: </label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emailError !== '' ? 'error' : ''}
            />
            {emailError && <div className="error">{emailError}</div>}

            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={passwordError !== '' ? 'error' : ''}
            />
            {passwordError && <div className="error">{passwordError}</div>}

            <button disabled={isLoading}>Sign up</button>
            {globalError && <div className="error">{globalError}</div>}
        </form>
    )
}

export default Signup;