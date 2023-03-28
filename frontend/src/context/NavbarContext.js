import React, { createContext, useReducer } from "react";

export const NavbarContext = createContext([]);

export const navbarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HEIGHT':
            return {
                ...state,
                height: action.payload,
            }
        case 'SET_VISIBILITY':
            return {
                ...state,
                visible: action.payload,
            }
        default:
            return state
    }
}

export const NavbarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(navbarReducer, {
        height: 0,
        visible: false,
    })
        
    return (
        <NavbarContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </NavbarContext.Provider>
    )
}