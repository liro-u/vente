import React, { useEffect, useRef, useState } from "react";
// css
import "../../css/buttons.css";

const ButtonLoadMore = ({ loadMore, x }) => {
    const [offset, setOffset] = useState(0);
    const [height, setHeight] = useState(0);
    const [maxScrollValue, setMaxScrollValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            var posBarAtm = window.scrollY
            setHeight(ref.current.offsetHeight)
            setMaxScrollValue(Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ));
            // position transition
            if (posBarAtm + window.innerHeight >= maxScrollValue) {
                setOffset(0);
            } else {
                setOffset(-height);
            }
        })    
    }, [height, maxScrollValue])

    

    return (
        <div className="loadMoreContainer">
            <div 
                className="loadMore primaryColor"
                ref={ref}
                style={{
                    bottom: offset + "px",
                }}

                onClick={() => {
                    loadMore(x)
                }}
            >
                <p>Load More</p>
                <span className="material-symbols-outlined arrowDown">expand_more</span>
            </div>
        </div>
        )
}

export default ButtonLoadMore;