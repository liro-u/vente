import React, {createContext, useReducer} from "react";
import {WallpaperContext} from "./WallpaperContext";

export const ShoppingCartContext = createContext([]);
export const ShoppingCartReducer = (state,action) => {
    switch (action.type){
        case 'SET_PRODUCT' :
            return {
                ...state,
                wallpapers : action.payload
            }
        case 'ADD_PRODUCT' :
            return{
                ...state,
                wallpapers : [ ...state.wallpapers, ...action.payload]
            }
        case 'REMOVE_PRODUCT' :
            return {
                ...state,
                wallpapers: state.wallpapers.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ShoppingCartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ShoppingCartReducer, {
        wallpapers: [],
    })

    return (
        <ShoppingCartContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </ShoppingCartContext.Provider>
    )
}