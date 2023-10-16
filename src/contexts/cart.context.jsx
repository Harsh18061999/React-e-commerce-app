import { createContext,useReducer} from "react";
import { createAction } from "../route/utils/reducer/reducer.utils";

const addCartItem = (cartItems,productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if found increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem,quantity:cartItem.quantity +1} : cartItem);
    }

    //return modifay array
    return [...cartItems,{...productToAdd,quantity:1}];
}


const removeCartItem = (cartItems,cartItemToRemove) => {
    //find if cartItems contains cartItemToRemove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //if cartitem is one then remove
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id != cartItemToRemove.id);
    }

    //return modifay array
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem,quantity:cartItem.quantity -1} : cartItem);
    }
}

const clerCartItem = (cartItems,cartItemToClear) => { //remover item from cart list
    return cartItems.filter((cartItem) => cartItem.id != cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount:0,
    removeItemFromCart: () => {},
    clerItemFromCart : () => {},
    cartTotal:0
})

const CART_ACTION_TYPE = {
    SET_CART_ITEMS:"SET_CART_ITEMS",
    SET_IS_CART_OPEN:"SET_IS_CART_OPEN"
}

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount:0,
    cartTotal:0
}

const cartReducer = (state,action) => {
    const {type,payload} = action;
    switch(type){
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`unhandel type of ${type} in cartReducer`);
    }
}



export const CartProvider = ({children}) => {
    // const [isCartOpen,setIsCartOpen] = useState(false);
    // const [cartItems,setCartItem] = useState([]);
    // const [cartCount,setCartCount] = useState(0);
    // const [cartTotal,setCartTotal] = useState(0);
    // useEffect(() => { //update cart count when change cart list
    //     const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity,0)
    //     setCartCount(newCartCount)
    // },[cartItems]);
    // useEffect(() => { //set total price
    //     const newCartTotal = cartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price ,0)
    //     setCartTotal(newCartTotal)
    // },[cartItems]);

    const updateCartItemReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price ,0);
        const newCartCount = newCartItems.reduce((total,cartItem) => total + cartItem.quantity,0);
        dispatch(
            createAction("SET_CART_ITEMS",{
                cartItems:newCartItems,
                cartTotal:newCartTotal,
                cartCount:newCartCount
            })
        )
    }
    const setIsCartOpen = (bool) => {
        dispatch(createAction("SET_IS_CART_OPEN",bool))
    }
    
    const [{cartItems,isCartOpen,cartCount,cartTotal },dispatch] = useReducer(cartReducer,INITAL_STATE);
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems =  (removeCartItem(cartItems,cartItemToRemove));
        updateCartItemReducer(newCartItems);
    }

    const clerItemFromCart = (cartItemToClear) => {
        const newCartItems = (clerCartItem(cartItems,cartItemToClear));
        updateCartItemReducer(newCartItems);
    }
   
    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,clerItemFromCart,cartItems,cartCount,cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};