import "./category.style.scss";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap , selectCategoriesIsLoading } from "../../store/categories/category.selector";
import {useSelector} from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
const Category = () => {
    // console.log("render/re-render category component");
    const {category} = useParams();
    const products = useSelector(selectCategoriesMap);
    const [product,setProduct] = useState(products[category]);
    const isLoading = useSelector(selectCategoriesIsLoading);
    useEffect(() => {
        // console.log("effect fire colling set product")
        setProduct(products[category]);
    },[category,products]);

    return(
        <Fragment>
            <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
            {
                isLoading ? <Spinner /> :   <div className="category-container">
                {
                    product && product.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
            }
          
        </Fragment>
    )
}

export default Category;