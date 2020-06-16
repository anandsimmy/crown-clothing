import { all, takeLatest, call, put } from 'redux-saga/effects'

import { firestore, transformCollectionArray } from '../../firebase/firebase-utils'
import { fetchCollectionDataSuccess, fetchCollectionDataFailure } from './shop-actions'
import shopActionTypes from './shop-action-types'

function* fetchCollectionAsync(){
    try{
        const collectionRef= firestore.collection('collections')
        const snaphsot= yield collectionRef.get()
        const collectionObj= yield call(transformCollectionArray, snaphsot)
        yield put(fetchCollectionDataSuccess(collectionObj))
    }catch(error){
        yield put(fetchCollectionDataFailure(error.message))
    }
}

export function* onFetchCollectionStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTION_DATA_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(onFetchCollectionStart)])
}