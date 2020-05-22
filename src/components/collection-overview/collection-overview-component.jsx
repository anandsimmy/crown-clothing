import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './collection-overview-styles.scss'
import CollectionPreview from '../collection-preview/collection-preview-component'
import { selectShopCollections } from '../../redux/shop/shop-selectors'

const CollectionOverview= ({ collections, ...props }) => (
    <div className='collectin-overview'> 
        {   
            collections.map(({ id, ...props }) => <CollectionPreview key={id} {...props} />)
        }
    </div>
)

const mapStateToProps= createStructuredSelector({
    collections: selectShopCollections
})

export default connect(mapStateToProps)(CollectionOverview)