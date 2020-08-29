import cartActionTypes from './cart-action-types'
import { addItemToCart, decrementItemQuantity } from './cart-utils'

const initalState= {
    hidden: true,
    cartItems: []
}

const cartReducer=(state= initalState, action) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_HIDDEN_STATE:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case cartActionTypes.DECREMENT_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: decrementItemQuantity(state.cartItems, action.payload)
            }
        case cartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case cartActionTypes.RESTORE_USER_CART:
            return {
                ...state,
                cartItems: action.payload
            }
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}

export default cartReducer