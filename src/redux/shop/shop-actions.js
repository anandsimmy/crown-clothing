import shopActionTypes from './shop-action-types'
import { firestore, transformCollectionArray } from '../../firebase/firebase-utils'

export const fetchCollectionDataStart= () => ({
    type: shopActionTypes.FETCH_COLLECTION_DATA_START
})

export const fetchCollectionDataSuccess =(collectionData) => ({
    type: shopActionTypes.FETCH_COLLECTION_DATA_SUCCESS,
    payload: collectionData
})

export const fetchCollectionDataFailure= (errorMessage) => ({
    type: shopActionTypes.FETCH_COLLECTION_DATA_FAILURE,
    payload: errorMessage
})

export const fetchCollectionDataAsyncOperation =() => {
    return (dispatch) => {
        dispatch(fetchCollectionDataStart())
        const collectionRef= firestore.collection('collections')
        collectionRef.get()
        .then(snapShotObj => {
            const collectionData= transformCollectionArray(snapShotObj)
            dispatch(fetchCollectionDataSuccess(collectionData))
        })
        .catch(error => {
            dispatch(fetchCollectionDataFailure(error.message))
        })
    }
}