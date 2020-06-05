import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/collection-overview-component';
import CollectionPage from  '../collection/collection-component'
import withSpinner from '../../components/with-spinner/with-spinner-component'

import { updateCollectionData } from '../../redux/shop/shop-actions'
import { firestore, transformCollectionArray } from '../../firebase/firebase-utils'

const CollectionOverviewWithSpinner= withSpinner(CollectionOverview)
const CollectionPageWithSpinner= withSpinner(CollectionPage)

class ShopPage extends Component {

    state= {
        loading: true
    }
    unSubscribeFromCollectionDataFetch= null

    componentDidMount(){

        const { updateCollectionData }= this.props

        const collectionRef= firestore.collection('collections')
        collectionRef.onSnapshot(snapShotObj => {
            const collectionData= transformCollectionArray(snapShotObj)
            updateCollectionData(collectionData)
            this.setState({loading: false})
        })
    }

    render() {

        const { match }= this.props
        const { loading }= this.state

        return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
        </div>)
    }
}

const mapDispatchToProps=dispatch => ({
    updateCollectionData: (collectionData) => dispatch(updateCollectionData(collectionData))
})

export default connect(null, mapDispatchToProps)(ShopPage)
