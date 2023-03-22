import React, {useEffect, useRef, useState} from "react";

// components
import NavbarOffset from "../../components/NavbarOffset";

//css
import "../../css/ThemeLol.css"

const ThemeLOL = ({id}) => {
    const [test, setTest] = useState(null)
    const container = useRef(null);
    const [height, setHeight] = useState(0);
    const TailleImg = useRef(null);

    const handleClick  = () => {
        container.current.classList.toggle('flipCard');
        setHeight(TailleImg.current.offsetHeight)
        console.log(height)
    };

    useEffect(()=>{
        const fecthImg = async (id) => {
            console.log(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/' + id);
            const img = await response.json()
            setTest(img);
        }
        fecthImg("6410dd5ad26154414a108244")
    }, [])

    return (

        <div style={{
            backgroundImage : `url("/wallpaper/FondImgThemeLol.png")`
        }}>
            <NavbarOffset />

            <div className="cardContainer" onClick={handleClick}>
                <div className="card" ref={container} style={{height : height}}>
                    <div className="flipImg">
                         {test && <img src={test.imageLink } alt="toto" ref={TailleImg}/>}

                    </div>

                    <div className="flipContenu">
                        <p> test </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeLOL;
