import shopActionTypes from './shop-action-types'

const INITIAL_STATE= {
    collections: null,
    isFetching: false,
    errorMessage: ''
}

const shopReducer=(state = INITIAL_STATE, action) => {
    switch(action.type){
        case shopActionTypes.FETCH_COLLECTION_DATA_START:
            return {
                ...state,
                isFetching: true
            }
        case shopActionTypes.FETCH_COLLECTION_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case shopActionTypes.FETCH_COLLECTION_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
                
            }
        default:
            return state 
    }
}

export default shopReducer