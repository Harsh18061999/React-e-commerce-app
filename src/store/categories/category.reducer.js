import { CATEGORIES_ACTION_TYPE } from "./category.types";

const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading:false,
    error:null
};

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE ,action) => {
    console.log(action, " action")
    console.log(state, " state")
    const {type,payload} = action;

    switch(type){
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_START :
            return {...state,isLoading:true}
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_SUCCESS :
            return {...state,categories:payload,isLoading:false}
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_FAIL :
            return {...state,isLoading:false,error:payload}
        case CATEGORIES_ACTION_TYPE.SET_CATEGORIES :
            return {...state,categories:payload}
        default :
            return state;
    }
}