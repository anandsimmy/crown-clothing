import React, { Component } from 'react'

import SHOP_DATA from './shop-data'

import CollectionPreview from '../../components/collection-preview/collection-preview-component'

class ShopPage extends Component {
    constructor(){
        super()
        this.state={
            collections: SHOP_DATA
        }
    }
    render(){

        const { collections }= this.state
        return (
            <div className='collection-preview'>
                {
                    collections.map(({ id, ...props } ) => 
                        <CollectionPreview key={id} {...props} />
                    )
                }
            </div>
        )
    }

}

export default ShopPage
