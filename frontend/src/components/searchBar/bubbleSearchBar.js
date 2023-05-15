import React from 'react';
import { useFilterContext } from '../../hooks/wallpaper/useFilterContext';

const BubbleSearchBar = ({content, color = "rgba(216, 112, 147, 0.716)", className, searchBar = true, dispatch_type = "", value}) => {
    const {dispatch} = useFilterContext();


    const handleClick = () => {
        if (!searchBar) {
            dispatch({type: dispatch_type, payload: !value})
        }
    }

    const handleChange = (new_value) => {
        dispatch({type: dispatch_type, payload: new_value});
    }

    return (
        <div 
            className={'bubbleSearchBar ' + className}
            onClick={handleClick}
            style={{
                backgroundColor: (value && !searchBar ? color : ""),
                cursor: "pointer"
            }}        
        >
            <p className='searchBarLabel' >{content + (searchBar ? " : " : "")}</p>
            {searchBar && <input type='text' onChange={(e) => handleChange(e.target.value)} className={'searchBar ' + className} value={value}/>}
        </div>
    )
}

export default BubbleSearchBar