import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/collection-overview-component';
import CollectionPage from  '../collection/collection-component'

import { updateCollectionData } from '../../redux/shop/shop-actions'
import { firestore, transformCollectionArray } from '../../firebase/firebase-utils'

class ShopPage extends Component {

    unSubscribeFromCollectionDataFetch= null

    componentDidMount(){

        const { updateCollectionData }= this.props

        const collectionRef= firestore.collection('collections')
        collectionRef.onSnapshot(snapShotObj => {
            const collectionData= transformCollectionArray(snapShotObj)
            updateCollectionData(collectionData)
        })
    }

    render() {

        const { match }= this.props

        return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>)
    }
}

const mapDispatchToProps=dispatch => ({
    updateCollectionData: (collectionData) => dispatch(updateCollectionData(collectionData))
})

export default connect(null, mapDispatchToProps)(ShopPage)
