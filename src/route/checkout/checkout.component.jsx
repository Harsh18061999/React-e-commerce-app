import "./checkout.style.scss";
import { useContext } from "react";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { selectCartItems,selectCartCount } from "../../store/cart/cart.selector";
import PaymentFrom from "../../components/payment-from/payment-from.component";
const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartCount);
    // const {cartItems,cartTotal} = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                <span>Discription</span>
                </div>
                <div className="header-block"> <span>Quantity</span></div>
                <div className="header-block"> <span>Price</span></div>
                <div className="header-block"> <span>Remove</span></div>
            </div>
      
            {cartItems.map((cartItem) => 
                <CheckOutItem key={cartItem.id} cartItem={cartItem}/>
            )}
            <span className="total">Total: ${cartTotal}  </span>
            <PaymentFrom />
        </div>
    )
}

export default Checkout;