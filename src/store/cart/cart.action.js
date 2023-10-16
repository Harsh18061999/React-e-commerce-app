import { createAction } from "../../route/utils/reducer/reducer.utils";
import {CART_ACTION_TYPE} from "./cart.types.js";

export const setIsCartOpen = (Boolean) => createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,Boolean);

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

export const addItemToCart = (cartItems,productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems);
}
export const removeItemFromCart = (cartItems,cartItemToRemove) => {
    const newCartItems =  (removeCartItem(cartItems,cartItemToRemove));
       return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems);
}

export const clerItemFromCart = (cartItems,cartItemToClear) => {
    const newCartItems = (clerCartItem(cartItems,cartItemToClear));
       return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems);
}
