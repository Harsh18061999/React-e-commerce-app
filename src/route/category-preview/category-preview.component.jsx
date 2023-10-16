import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap,selectCategoriesIsLoading } from "../../store/categories/category.selector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "../../components/spinner/spinner.component";
const   CategorysPreview = () => {
    const products = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <Fragment>
            {
                isLoading ? <Spinner /> : ( Object.keys(products).map((title) =>{
                    const productsData = products[title];
                    return (<CategoryPreview key={title} title={title} products={productsData} />)
                }))
            }
           
        </Fragment>
        
    );
}

export default CategorysPreview;