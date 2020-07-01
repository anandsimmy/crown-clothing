import { takeLatest, put, call, all } from 'redux-saga/effects'

import { auth, googleProvider, getCurrentUser, createUserProfileInDB } from '../../firebase/firebase-utils'

import userActionTypes from './user-action-types'
import { signInSuccess,
         signInFailure,
         signUpSuccess,
         signUpFailure,
         signOutSuccess,
         signOutFailure } from './user-actions'

export function* snapShotFromDB(userAuth, additionalData){
    try{
        const userRef= yield createUserProfileInDB(userAuth, additionalData)
        const userSnapshot= yield userRef.get()
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* isUserAlreadySignedIn(){
    try{
        const userAuth= yield getCurrentUser()
        if(!userAuth)
            return
        yield snapShotFromDB(userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* googleSignIn(){
    try{
        const { user }= yield auth.signInWithPopup(googleProvider)
        yield snapShotFromDB(user)
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* emailSignIn({payload: {email, password}}){
    try{
        const { user }= yield auth.signInWithEmailAndPassword(email, password)
        yield snapShotFromDB(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* signUp({ payload: { displayName, email, password }}){
    try{
        const { user }= yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess())
        yield snapShotFromDB(user, {displayName})
    }catch(error){
        yield put(signUpFailure(error))
    }
}

//listeners
export function* onCheckUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAlreadySignedIn)
}

export function* onGoogleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* onSignOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart)
    ])
}

