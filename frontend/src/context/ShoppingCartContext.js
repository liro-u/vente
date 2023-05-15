import React, {createContext, useReducer} from "react";

export const ShoppingCartContext = createContext([]);

export const ShoppingCartReducer = (state,action) => {
    switch (action.type){
        case 'SET_PRODUCT' :
            return {
                ...state,
                products : action.payload
            }
        case 'ADD_PRODUCT' :
            return{
                ...state,
                products : [ ...state.products, ...action.payload]
            }

        case 'REMOVE_PRODUCT' :
            return {
                ...state,
                products: state.products.filter((p) => p._id !== action.payload._id)
            }

        case 'REPLACE_PRODUCT':
            const newProducts = state.products
            for (let i = 0; i < newProducts.length; i++) {
                if (newProducts[i]._id === action.payload.lastProduct._id) {
                    newProducts[i] = action.payload.newProduct
                }
            }
            return {
                ...state,
                products: newProducts
            }
        default:
            return state
    }
}

export const ShoppingCartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ShoppingCartReducer, {
        products: [],
    })

    return (
        <ShoppingCartContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </ShoppingCartContext.Provider>
    )
}