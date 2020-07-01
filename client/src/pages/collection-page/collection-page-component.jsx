import React from 'react'
import { connect } from 'react-redux'

import './collection-page-styles.scss'
import { selectCollectionCatgeory } from '../../redux/shop/shop-selectors'
import CollectionItem from '../../components/collection-item/collection-item-component'

const CollectionPage= ({ collection }) => {
    const { title, items }= collection
    return (
    <div className='collection-page'>
        <h1 className='title'>{title}</h1>
        <div className='items'>
            {
                items.map(item => <CollectionItem key={item.id} item={item} />)
            }
        </div>
    </div>
)}

const mapStateToProps= (state, ownProps) => ({
    collection: selectCollectionCatgeory(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)