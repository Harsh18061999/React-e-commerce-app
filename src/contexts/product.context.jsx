import { useState } from "react";
import { createContext,useEffect } from "react";

import SHOP_DATA from "../SHOP_DATA.js";
import { getCategoriesAndDocument } from "../route/utils/firebase/firebase.utils.js";
export const ProductsContext = createContext({
    products: [],

});

export const ProductServieProvider = ({children}) => {
    const [products,setProducts] =  useState({});
    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocument();
            setProducts(categoryMap);
        }
        getCategoriesMap(); 
    },[])
    const value = {products};
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}
