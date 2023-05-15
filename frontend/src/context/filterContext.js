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
        case 'SET_SEARCH':
            console.log("update : " + state.searchFilter);
            return {
                ...state,
                searchFilter: action.payload,
            }
        default:
            return state
    }
}

export const FilterContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, {
        likedFilter: false,
        newFilter: false,
        searchFilter: "",
    })
        
    return (
        <FilterContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </FilterContext.Provider>
    )
}