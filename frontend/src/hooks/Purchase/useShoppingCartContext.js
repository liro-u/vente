import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";

export const useShoppingCartContext = () => {
    const context = useContext(ShoppingCartContext);

    if (!context) {
        throw Error('useShoppingCartContext must be used inside an shoppingCartContextProvider');
    }

    return context;
}