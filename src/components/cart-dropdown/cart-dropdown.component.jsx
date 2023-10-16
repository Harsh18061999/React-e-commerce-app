import "./cart-dropdown.style.scss"
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
    const navigate = useNavigate(); //use for navigation to specific path
    const cartItems = useSelector(selectCartItems);
    const navigationHandler = () => {
        navigate('/checkout')
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem cartItem={item}/>)}
            </div>
            <Button onClick={navigationHandler}>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;