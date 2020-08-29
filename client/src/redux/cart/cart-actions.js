import cartActionTypes from './cart-action-types'

export const toggleCartHidden=() => ({
    type: cartActionTypes.TOGGLE_HIDDEN_STATE
})

export const addItem=item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})

export const addItemInAllCarts=item => ({
    type: cartActionTypes.ADD_ITEM_IN_ALL_CARTS,
    payload: item
})

export const subtractItem=item => ({
    type: cartActionTypes.SUBTRACT_ITEM,
    payload: item
})

export const subtractItemInAllCarts=item => ({
    type: cartActionTypes.SUBTRACT_ITEM_IN_ALL_CARTS,
    payload: item
})

export const clearItem=item => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item
})

export const clearItemInAllCarts=item => ({
    type: cartActionTypes.CLEAR_ITEM_IN_ALL_CARTS,
    payload: item
})

export const startRestoreUserCart=() => ({
    type: cartActionTypes.START_RESTORE_USER_CART
})

export const restoreCart=(savedCartItems) => ({
    type: cartActionTypes.RESTORE_USER_CART,
    payload: savedCartItems
})

export const clearCart=() => ({
    type: cartActionTypes.CLEAR_CART
})