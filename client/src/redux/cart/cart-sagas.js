import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects'

import { addItemsToOnlineUserCart } from '../../firebase/firebase-utils'
import userActionTypes from '../user/user-action-types'
import cartActionTypes from './cart-action-types'
import { clearCart, addItem } from './cart-actions'

export function* clearShopCart(){
    yield put(clearCart())
}

export function* addItemToAllCarts({ payload }){
    try {
        yield addItemsToOnlineUserCart(payload)
        yield put(addItem(payload))
    }
    catch{
        console.log('error when adding item')
    }
}

export function* onAddItemToAllCarts(){
    yield takeEvery(cartActionTypes.ADD_ITEM_TO_ALL_CARTS, addItemToAllCarts)
}

export function* onClearCart(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearShopCart)
}

export function* cartSagas(){
    yield all([
        call(onClearCart),
        call(onAddItemToAllCarts)
    ])
}