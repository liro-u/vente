import React, { createContext, useReducer } from "react";

export const WallpaperContext = createContext([]);

export const wallpaperReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WALLPAPER':
            return {
                ...state,
                wallpapers: action.payload,
            }
        case 'MERGE_WALLPAPER':
            return {
                ...state,
                wallpapers: [...state.wallpapers, ...action.payload]
            }
        case 'DELETE_WALLPAPER':
            return {
                ...state,
                wallpapers: state.wallpapers.filter((w) => w._id !== action.payload._id)
            }
        case 'SET_NO_MORE_LOAD':
            return {
                ...state,
                noMoreLoad: action.payload
            }
        default:
            return state
    }
}

export const WallpaperContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wallpaperReducer, {
        wallpapers: [],
        noMoreLoad: false,
    })
        
    return (
        <WallpaperContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </WallpaperContext.Provider>
    )
}