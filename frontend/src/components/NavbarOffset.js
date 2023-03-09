import React, { useEffect, useState } from "react";

const NavbarOffset = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(document.querySelector("header.navbar").offsetHeight)
    }, []);

    return (
        <div
            className="navbarOffset"
            style={{
                paddingBottom: offset
            }}
        >

        </div>
    )
}

export default NavbarOffset;