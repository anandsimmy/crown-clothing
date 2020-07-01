import React, { useEffect } from 'react'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview-container';
import CollectionPageContainer from  '../collection-page/collection-page-container'

import { fetchCollectionDataStart } from '../../redux/shop/shop-actions'

const ShopPage=({ fetchCollectionDataStart, match }) => {

   useEffect(()=>{
    fetchCollectionDataStart()
   }, [fetchCollectionDataStart])

    return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    )
}

const mapDispatchToProps=dispatch => ({
    fetchCollectionDataStart: () => dispatch(fetchCollectionDataStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)
