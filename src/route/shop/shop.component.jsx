import {Routes,Route} from  "react-router-dom"
import { useEffect } from "react";
import CategorysPreview from "../category-preview/category-preview.component";
import Category from "../category/category.component";
import "./products.style.scss"
import { useDispatch } from "react-redux/es/exports";
import { fetchCategoryStart } from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryStart());
    },[]);
    return (
       <Routes>
            <Route index element={<CategorysPreview/>} />
            <Route path=":category" element={<Category /> } />
       </Routes>
    );
}

export default Shop;