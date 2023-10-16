import "./checkout-item.style.scss";
import { useContext } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { CartContext } from "../../contexts/cart.context";
import { addItemToCart,removeItemFromCart,clerItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
const CheckOutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    // const {cartItems,addItemToCart,removeItemFromCart,clerItemFromCart} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

    const {name,imageUrl,price,quantity} = cartItem;
    const cearItemHendler = () => dispatch(clerItemFromCart(cartItems,cartItem));
    const addItemHendler = () => dispatch(addItemToCart(cartItems,cartItem));
    const removeItemHendler = () => dispatch(removeItemFromCart(cartItems,cartItem));
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHendler}>&#10094;</div>
                <span className="value"> {quantity}</span>
                <div className="arrow" onClick={addItemHendler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={cearItemHendler}>&#10005;</div>
        </div>
    )
}

export default CheckOutItem;