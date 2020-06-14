import { takeLatest, put, call, all } from 'redux-saga/effects'

import userActionTypes from './user-action-types'
import { googleSignInSuccess, googleSignInFailure } from './user-actions'

import { signInWithGoogle, createUserProfileInDB } from '../../firebase/firebase-utils'

export function* googleSignIn(){
    try{
    const { user }= yield call(signInWithGoogle)
    const userRef= yield call(createUserProfileInDB,user)
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

export function* userSagas(){
    yield all([call(googleSignInStart)])
}

