import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import NavbarOffset from "../../components/NavbarOffset";
import {useAuthContext} from "../../hooks/auth/useAuthContext";


//Components

//css

const ShoppingCart = () => {

    const {user} = useAuthContext();

    useEffect(() => {
        const fecthImg = async () => {
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/',
            {
                headers: {
                    'Authorization': `Baerer ${user.token}`
                }
            });
            const truc = await response.json()
            console.log(truc)
        }
        fecthImg()



    }, [])



    return(
        <div className="ShoppingCart">
            <NavbarOffset />
            <div>
            <p> sfdfg r</p>
            </div>
        </div>
    )
}

export default ShoppingCart;