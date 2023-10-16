import "./card-icon.style.scss"
import { ReactComponent as ShoppingIcon } from "../../assets/115 - shopping-bag.svg";

import { useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectCartTotal, selectCartOpen } from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";
const CardIcon = () => {
    const dispatch  = useDispatch();
    const cartCount = useSelector(selectCartTotal);
    const isCartOpen = useSelector(selectCartOpen);


    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CardIcon;