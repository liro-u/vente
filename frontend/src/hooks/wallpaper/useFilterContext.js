import { FilterContext } from "../../context/filterContext";
import { useContext } from "react";

export const useFilterContext = () => {
    const context = useContext(FilterContext);

    if (!context) {
        throw Error('useFilterContext must be used inside an FilterContextProvider');
    }

    return context;
}