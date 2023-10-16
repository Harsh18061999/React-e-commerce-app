import {takeLatest,all, put ,call} from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import { signInSucces,signInFail, signUpSuccess, signUpFail, signOutSucess, signOutFail } from "./user.action";
import {
     createUserDocumentFromAuth, getCurrentUser,singnInWithGooglePopup,
     signInAuthUserWithEmailAndPassword,
     createAuthUserWithEmailAndPassword,
     singnOutUser
 } from "../../route/utils/firebase/firebase.utils";


export function* getSnapShoatFromUserAuth(userAuth,additionalDetails ){
    try{
        const userSnapShoat = yield call(createUserDocumentFromAuth,userAuth,additionalDetails);
        console.log(userSnapShoat  , " userSnapShoat")
        console.log(userSnapShoat.data()," userSnapShoatdata")
        yield put(signInSucces({id:userSnapShoat.id,...userSnapShoat.data()}))
    }catch (error){
        yield put(signInFail(error))
    }
}

export function* signInWithGoogle(){
    try{
       const {user} = yield call(singnInWithGooglePopup)
       yield call(getSnapShoatFromUserAuth,user)
    }catch(error){
        yield put(signInFail(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;

        yield call(getSnapShoatFromUserAuth,userAuth);

    }catch(error){
        yield put(signInFail(error))
    }
}

export function* signInWithEmail({payload: {email,password}}){
    try{
        const {user} = yield call(signInAuthUserWithEmailAndPassword,email,password)
        yield call(getSnapShoatFromUserAuth,user)
    }catch(error){
        yield put(signInFail(error))
    }
}

export function* signUp({payload:{email,password,displayName}}) {
    try{

        const {user} = yield call(createAuthUserWithEmailAndPassword,email,password)
        yield put(signUpSuccess(user,{displayName}))
    }catch(error){
        yield put(signUpFail(error))
    }
}

export function* signInAfterSignUp({payload:{user,additionalDetails}}){
    yield call(getSnapShoatFromUserAuth,user,additionalDetails)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS,signInAfterSignUp);
}
export function* onGoogleSignInstart(){
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION,isUserAuthenticated);
}
 
export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START,signUp)
}

export function* signOut(){
    try{
        yield call(singnOutUser);
        yield put(signOutSucess());
    }catch(error){
        yield put(signOutFail(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START,signOut);
}
export function* userSaga(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInstart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}