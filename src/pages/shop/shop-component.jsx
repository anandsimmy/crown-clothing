import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CollectionOverview from '../../components/collection-overview/collection-overview-component';
import CollectionPage from  '../collection/collection-component'
import withSpinner from '../../components/with-spinner/with-spinner-component'

import { fetchCollectionDataAsyncOperation } from '../../redux/shop/shop-actions'
import { selectIsLoadingIndicator } from '../../redux/shop/shop-selectors'

const CollectionOverviewWithSpinner= withSpinner(CollectionOverview)
const CollectionPageWithSpinner= withSpinner(CollectionPage)

class ShopPage extends Component {

    componentDidMount(){
        this.props.fetchCollectionDataStart()
    }

    render() {

        const { match, isLoading }= this.props

        return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />} />
        </div>)
    }
}

const mapStatetoProps= createStructuredSelector({
    isLoading: selectIsLoadingIndicator
})

const mapDispatchToProps=dispatch => ({
    fetchCollectionDataStart: () => dispatch(fetchCollectionDataAsyncOperation())
})

export default connect(mapStatetoProps, mapDispatchToProps)(ShopPage)
