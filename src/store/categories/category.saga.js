import {takeLatest,all, put ,call} from "redux-saga/effects";
import { getCategoriesAndDocument } from "../../route/utils/firebase/firebase.utils";
import { fetchCategoryFail,fetchCategorySuccess } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export function* fetchCategoryAsync(){
    try{
        const categoriesArray = yield call(getCategoriesAndDocument,'categories');
        yield put(fetchCategorySuccess(categoriesArray));
    }catch (error){
        yield put(fetchCategoryFail(error));
    }
}
export function* onFetchCategories(){
   
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_START,fetchCategoryAsync)
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)]);
}