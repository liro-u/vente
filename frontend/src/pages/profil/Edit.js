import React from "react";
import { useState } from "react";

import NavbarOffset from '../../components/NavbarOffset'
import { useEditProfile } from "../../hooks/profil/useEditProfile";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const EditProfile = () => {

    const { user } = useAuthContext();

    const [pseudo, setPseudo] = useState(user.pseudo);

    const { saveChange, pseudoError, globalError, isLoading } = useEditProfile();

    const handleSave = async (e) => {
        e.preventDefault();

        await saveChange(pseudo)
        alert('Your profile is fresh new !')
    }

    return (
        <form className="editProfile" onSubmit={handleSave}>
            <NavbarOffset />
            <h1>Edit Profile</h1>

            <label>Pseudo: </label>
            <input
                type="text"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                className={pseudoError !== '' ? 'error' : ''}
            />
            {pseudoError && <div className="error">{pseudoError}</div>}

            <button disabled={isLoading}>Save Change</button>
            {globalError && <div className="error">{globalError}</div>}
        </form>
    )
}



export default EditProfile;