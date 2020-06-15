import userActionTypes from './user-action-types'

export const googleSignInStart= () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
})

export const googleSignInSuccess= user => ({
    type: userActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

export const googleSignInFailure= error => ({
    type: userActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
})

export const emailSignInStart= user=> ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: user
})

export const emailSignInSuccess= user => ({
    type: userActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
})

export const emailSignInFailure= error => ({
    type: userActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
})