import { takeLatest, put, call, all } from 'redux-saga/effects'

import { auth, googleProvider, createUserProfileInDB } from '../../firebase/firebase-utils'

import userActionTypes from './user-action-types'
import { signInSuccess, signInFailure } from './user-actions'

export function* snapShotFromDB(userAuth){
    try{
        const userRef= yield createUserProfileInDB(userAuth)
        const userSnapshot= yield userRef.get()
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    }catch(error){
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

export function* googleSignIn(){
    try{
        const { user }= yield auth.signInWithPopup(googleProvider)
        yield snapShotFromDB(user)
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* googleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export function* emailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* userSagas(){
    yield all([call(googleSignInStart), call(emailSignInStart)])
}

