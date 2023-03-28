import React, { useEffect, useState } from "react";
import { useNavbarContext } from "../hooks/navbar/useNavbarContext";

const NavbarOffset = () => {
    const {height} = useNavbarContext();

    return (
        <div
            className="navbarOffset"
            style={{
                paddingBottom: height
            }}
        >

        </div>
    )
}

export default NavbarOffset;