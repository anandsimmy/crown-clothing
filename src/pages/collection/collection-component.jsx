import React from 'react'
import { connect } from 'react-redux'

import './collection-styles.scss'
import { selectCollectionCatgeory } from '../../redux/shop/shop-selectors'

const CollectionPage= ({ collection }) => {
    console.log(collection)
    return (
    <div className='collection-page'>
        <h1>COLLECTION PAGE</h1>
    </div>
)}

const mapStateToProps= (state, ownProps) => ({
    collection: selectCollectionCatgeory(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)