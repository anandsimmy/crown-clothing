import userActionTypes from './user-action-types'

export const googleSignInStart= () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart= user=> ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: user
})

export const signInSuccess= user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure= error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSession=() => ({
    type: userActionTypes.CHECK_USER_SESSION
})