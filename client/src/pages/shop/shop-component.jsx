import React, { useEffect, lazy, Suspense } from 'react'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from '../../components/spinner/spinner-component.jsx'

import { fetchCollectionDataStart } from '../../redux/shop/shop-actions'
//lazy loading
const CollectionOverviewContainer= lazy(()=> import('../../components/collection-overview/collection-overview-container'))
const CollectionPageContainer= lazy(() =>import('../collection-page/collection-page-container'))

const ShopPage=({ fetchCollectionDataStart, match }) => {

   useEffect(()=>{
    fetchCollectionDataStart()
   }, [fetchCollectionDataStart])

    return(
        <div className='shop-page'>
            <Suspense fallback={<Spinner />}>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            </Suspense>
        </div>
    )
}

const mapDispatchToProps=dispatch => ({
    fetchCollectionDataStart: () => dispatch(fetchCollectionDataStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)
