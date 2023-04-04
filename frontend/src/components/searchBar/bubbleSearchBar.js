import React from 'react';
import { useFilterContext } from '../../hooks/wallpaper/useFilterContext';

const BubbleSearchBar = ({content, color = "rgba(216, 112, 147, 0.716)", className, searchBar = true, dispatch_type = "", value}) => {
    const {dispatch} = useFilterContext();


    const handleClick = () => {
        if (!searchBar) {
            dispatch({type: dispatch_type, payload: !value})
        }
    }

    return (
        <div 
            className={'bubbleSearchBar ' + className}
            onClick={handleClick}
            style={{
                backgroundColor: (value && !searchBar ? color : "")
            }}        
        >
            <p className='searchBarLabel' >{content + (searchBar ? " : " : "")}</p>
            {searchBar && <input type='text' className={'searchBar ' + className}/>}
        </div>
    )
}

export default BubbleSearchBar