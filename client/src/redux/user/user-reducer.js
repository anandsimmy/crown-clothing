import userActionTypes from './user-action-types'

const initialState= {
    currentUser: null,
    error: null
}

const userReducer=(currentState= initialState, action) => {
    switch(action.type){
        case userActionTypes.SIGN_UP_SUCCESS:
            return {
                ...currentState,
                error: null
            }
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...currentState,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...currentState,
                currentUser: null,
                error: null
            }
        case userActionTypes.SIGN_IN_FAILURE:
        case userActionTypes.SIGN_OUT_FAILURE:
        case userActionTypes.SIGN_UP_FAILURE:
            return {
                ...currentState,
                error: action.payload
            }
        default:
            return currentState
    }
}

export default userReducer