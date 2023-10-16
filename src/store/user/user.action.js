import { createAction } from "../../route/utils/reducer/reducer.utils";
import {USER_ACTION_TYPE} from './user.types.js';

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPE.SET_CURRENT_USER,user);


// export const USER_ACTION_TYPE = {
//     SET_CURRENT_USER:"user/SET_CURRENT_USER",
//     CHECK_USER_SESSION:"user/CHECK_USER_SESSION",
//     GOOGLE_SIGN_IN_START:"user/GOOGLE_SIGN_IN_START",
//     EMAIL_SIGN_IN_START:"user/EMAIL_SIGN_IN_START",
//     SIGN_IN_SUCCESS:"user/SIGN_IN_SUCCESS",
//     SIGN_IN_FAILYEAR:"user/SIGN_IN_FAILYEAR"
// }
export const checkUserSession = () => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);
export const googleSignInStart = () => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);
export const signInSucces = (user) => createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS,user);
export const signInFail = (error) => createAction(USER_ACTION_TYPE.SIGN_IN_FAILYEAR,error);
export const emailSignInStart = (email,password) => createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START,{email,password});

export const signUpStart = (email,password,dispalyName) => createAction(USER_ACTION_TYPE.SIGN_UP_START,{email,password,dispalyName});
export const signUpSuccess = ({user,additionalDetails}) => createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS,{user,additionalDetails});
export const signUpFail = (error) => createAction(USER_ACTION_TYPE.SIGN_UP_FAIL,error);

export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START);
export const signOutSucess = () => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);
export const signOutFail = () => createAction(USER_ACTION_TYPE.SIGN_OUT_FAIL);
