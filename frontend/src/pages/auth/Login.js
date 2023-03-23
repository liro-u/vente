import React from "react";
import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";

// components
import NavbarOffset from '../../components/NavbarOffset'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, emailError, passwordError, globalError, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <NavbarOffset />
            <h1>Log in</h1>

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

export default Login;