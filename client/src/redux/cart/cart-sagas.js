import { all, call, takeLatest, put } from 'redux-saga/effects'

import userActionTypes from '../user/user-action-types'
import { clearCart } from './cart-actions'

export function* clearShopCart(){
    yield put(clearCart())
}

export function* onClearCart(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearShopCart)
}

export function* cartSagas(){
    yield all([
        call(onClearCart)
    ])
}