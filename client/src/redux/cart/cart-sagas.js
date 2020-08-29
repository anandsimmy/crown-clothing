import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects'

import { addItemInOnlineCart, subtractItemInOnlineCart, clearItemInOnlineCart, getSavedCartItems } from '../../firebase/firebase-utils'
import userActionTypes from '../user/user-action-types'
import cartActionTypes from './cart-action-types'
import { addItem, subtractItem, clearItem, clearCart, restoreCart } from './cart-actions'

export function* clearShopCart(){
    yield put(clearCart())
}

export function* addItemInAllCarts({ payload }){
    try {
        yield addItemInOnlineCart(payload)
        yield put(addItem(payload))
    }
    catch{
        console.log('error when adding item')
    }
}

export function* subtractItemInAllCarts({ payload }){
    try {
        yield subtractItemInOnlineCart(payload)
        yield put(subtractItem(payload))
    }
    catch{
        console.log('error when subtracting item')
    }
}

export function* restoreUserCart(){
    let savedCartItems= yield getSavedCartItems()
    if(savedCartItems==undefined || savedCartItems==null)
        savedCartItems= []
    yield put(restoreCart(savedCartItems))
}

export function* clearItemInAllCarts({ payload }){
    try {
        yield clearItemInOnlineCart(payload)
        yield put(clearItem(payload))
    }
    catch{
        console.log('error when clearing item')
    }
}


//listeners
export function* onAddItemInAllCarts(){
    yield takeEvery(cartActionTypes.ADD_ITEM_IN_ALL_CARTS, addItemInAllCarts)
}

export function* onSubtractItemInAllCarts(){
    yield takeEvery(cartActionTypes.SUBTRACT_ITEM_IN_ALL_CARTS, subtractItemInAllCarts)
}

export function* onClearItemInAllCarts(){
    yield takeLatest(cartActionTypes.CLEAR_ITEM_IN_ALL_CARTS, clearItemInAllCarts)
}

export function* onStartRestoreUserCart(){
    yield takeLatest(cartActionTypes.START_RESTORE_USER_CART, restoreUserCart)
}

export function* onClearCart(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearShopCart)
}

export function* cartSagas(){
    yield all([
        call(onAddItemInAllCarts),
        call(onSubtractItemInAllCarts),
        call(onClearItemInAllCarts),
        call(onStartRestoreUserCart),
        call(onClearCart)
    ])
}