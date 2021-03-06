import { createSelector } from 'reselect'

const selectShop= state => state.shop

export const selectShopCollections= createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectShopCollectionsOverView= createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollectionCatgeory= (collectionUrlParam) => (
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
    )
)

export const selectIsFetching= createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsComponentDataLoaded= createSelector(
    [selectShop],
    shop => !!shop.collections
)