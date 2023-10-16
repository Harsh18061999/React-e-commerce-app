import "./category.style.scss"
import { useNavigate } from "react-router-dom";
const CategoryItem =  ({category}) => {
    const {imageUrl,title,route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
    <div className='directory-container' onClick={onNavigateHandler}>
        <div className="background-image" style={{
            backgroundImage:`url(${imageUrl})`
        }}/>
        <div className='directory-body-container'>
          <h2>{title}</h2>
          <p>shop now</p>
        </div>
      </div>
    );
};

export default CategoryItem;