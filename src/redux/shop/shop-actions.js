import shopActionTypes from './shop-action-types'

export const updateCollectionData=(CollectionData) => ({
    type: shopActionTypes.UPDATE_COLLECTION_DATA,
    payload: CollectionData
})