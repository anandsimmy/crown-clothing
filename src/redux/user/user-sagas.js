import { takeLatest, put, call, all } from 'redux-saga/effects'

import { auth, googleProvider, createUserProfileInDB } from '../../firebase/firebase-utils'

import userActionTypes from './user-action-types'
import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from './user-actions'

export function* emailSignIn({payload: {email, password}}){
    try{
        const { user }= yield auth.signInWithEmailAndPassword(email, password)
        const userRef= yield createUserProfileInDB(user)
        const userSnapshot= yield userRef.get()
        yield put(emailSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    }catch(error){
        yield put(emailSignInFailure(error))
    }
}

export function* googleSignIn(){
    try{
    const { user }= yield auth.signInWithPopup(googleProvider)
    const userRef= yield createUserProfileInDB(user)
    const userSnapshot= yield userRef.get()
    yield put(googleSignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
    }))
    }
    catch(error){
    console.log(error)
    yield put(googleSignInFailure(error))
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

