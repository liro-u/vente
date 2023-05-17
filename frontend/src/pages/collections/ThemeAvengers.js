import React from "react";

import "../../css/ThemeAvengers.css"

const ThemeAvengers = () => {
    return (
        <div className="ThemeAvengers">

            <h1 className="titre"> Whatever it takes, wherever it takes us, we'll protect this planet. We'll do whatever it takes <br /> <br />Avengers Comming Soon ... </h1>

            <table>
                <tbody>
                <tr>
                    <td colspan="2">
                        <img className="lol" src="../wallpaper/avengers.jpg" alt="toto"/>
                    </td>

                    <td>
                        <img className="lol" src="../wallpaper/avengers2.jpg" alt="toto"/>
                    </td>

                    <td rowspan="2">
                        <img className="lol" src="../wallpaper/avengers3.jpg" alt="toto"/>
                    </td>

                </tr>

                <tr>
                    <td>
                        <img className="lol" src="../wallpaper/avengers5.jpg" alt="toto"/>
                    </td>

                    <td rowspan="3">
                        <img className="lol" src="../wallpaper/avengers14.jpg" alt="toto"/>
                    </td>

                    <td>
                        <img className="lol" src="../wallpaper/avengers7.jpg" alt="toto"/>
                    </td>

                </tr>


                <tr>
                    <td rowspan="4">
                        <img className="lol" src="../wallpaper/avengers9.jpg" alt="toto"/>
                    </td>

                    <td colspan="2">
                        <img className="lol" src="../wallpaper/avengers12.jpg" alt="toto"/>
                    </td>

                </tr>


                <tr>

                    <td>
                        <img className="lol" src="../wallpaper/avengers7.jpg" alt="toto"/>
                    </td>

                    <td>
                        <img className="lol" src="../wallpaper/avengers8.jpg" alt="toto"/>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ThemeAvengers;
