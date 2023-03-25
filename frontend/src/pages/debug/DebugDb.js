import React, { useEffect } from "react";
import NavbarOffset from "../../components/NavbarOffset";
import { useAuthContext } from '../../hooks/auth/useAuthContext';


const DebugDb = () => {
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchDebug = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/debug/db', {
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            });
            const json = await response.json();
            console.log(json);

            if (response.ok) {
                console.log("ok")
            }
        }
        if (!user){
            alert('You must be logged in')
        }else{
            fetchDebug();
        }
    }, [user])

    return (
        <div>
            <NavbarOffset />
            <h1>Debug Db</h1>
        </div>
    )
}

export default DebugDb;