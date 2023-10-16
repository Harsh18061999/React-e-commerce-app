import { createContext  , useEffect, useReducer} from "react";
import { onAuthStateChangedListener , createUserDocumentFromAuth } from "../route/utils/firebase/firebase.utils";
//as the actual value you want to access
export const UserConrtext = createContext({
    currentUser:null,
    setCurrentUser:() => null,
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER:"SET_CURRENT_USER"
}

const UserReducer = (state,action) => {
    console.log("dispatched")
    console.log(action)
    const {type,payload} = action;

    switch(type){
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:payload
            }
        default:
            throw new Error(`Unhandel type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser:null
};

export const UserProvider = ({children}) => {
    const [{currentUser},dispatch] = useReducer(UserReducer,INITIAL_STATE);
    console.log(currentUser)
    const setCurrentUser = (user) => {
        dispatch({type:USER_ACTION_TYPE.SET_CURRENT_USER,payload:user})
    }

    const value = {currentUser,setCurrentUser};
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
            console.log(user,"This is user")
        });
        return unsubscribe;
    },[]) 
    return  <UserConrtext.Provider value={value}>{children}</UserConrtext.Provider>
}