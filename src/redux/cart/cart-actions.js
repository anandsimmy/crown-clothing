import { cartActionTypes } from './cart-types'

export const toggleCartHidden=() => ({
    type: cartActionTypes.TOGGLE_HIDDEN_STATE
})

export const addItem=item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})

export const clearItem=item => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item
})

export const decrementItemQuantity=item => ({
    type: cartActionTypes.DECREMENT_ITEM_QUANTITY,
    payload: item
})