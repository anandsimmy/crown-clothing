import React from 'react'
import { withRouter } from'react-router-dom'

import './collection-preview-styles.scss'

import CollectionItem from '../collection-item/collection-item-component'

const CollectionPreview = ({ title, items, routeName, history, match }) => (
    <div className='collection-preview'>
        <h1 className='title'>
            <span onClick={()=>history.push(`${match.url}/${routeName}`)} className='title-pointer'>
                {title.toUpperCase()}
            </span>
        </h1>
        <div className='preview'>
        {
            items.filter((item, idx) => idx < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
        }
        </div>
    </div>
)

export default withRouter(CollectionPreview)