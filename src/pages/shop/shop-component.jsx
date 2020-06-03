import React, { Component } from 'react'
import { Route} from 'react-router-dom'

import CollectionOverview from '../../components/collection-overview/collection-overview-component';
import CollectionPage from  '../collection/collection-component'

import { firestore, transformCollectionArray } from '../../firebase/firebase-utils'

class ShopPage extends Component {

    unSubscribeFromCollectionDataFetch= null

    componentDidMount(){
        const collectionRef= firestore.collection('collections')
        collectionRef.onSnapshot(snapShotObj => {
            transformCollectionArray(snapShotObj)
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

export default ShopPage
