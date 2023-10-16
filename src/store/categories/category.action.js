import { createAction } from "../../route/utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";
export const setCategoriesMap = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES,categoriesMap);

export const fetchCategoryStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_START);
export const fetchCategorySuccess = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_SUCCESS,categoriesMap);
export const fetchCategoryFail = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_FAIL,error);

