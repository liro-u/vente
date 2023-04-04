import React, { createContext, useReducer } from "react";

export const FilterContext = createContext([]);

export const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIKED':
            return {
                ...state,
                likedFilter: action.payload,
            }
        case 'SET_NEW':
            return {
                ...state,
                newFilter: action.payload,
            }
        case 'SET_TAGS':
            return {
                ...state,
                tagsFilter: action.payload,
            }
        case 'SET_ARTIST':
            return {
                ...state,
                artistFilter: action.payload,
            }
        case 'SET_TITLE':
            return {
                ...state,
                titleFilter: action.payload,
            }
        default:
            return state
    }
}

export const FilterContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, {
        likedFilter: false,
        newFilter: false,
        tagsFilter: [],
        titleFilter: [],
        artistFilter: [],
    })
        
    return (
        <FilterContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </FilterContext.Provider>
    )
}