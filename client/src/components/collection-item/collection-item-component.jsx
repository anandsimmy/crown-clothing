import React from 'react'
import { connect } from 'react-redux'

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
 } from './collection-item-styles'

import { addItem } from '../../redux/cart/cart-actions'

const CollectionItem=({ item, AddItem}) => {
    const { name, price, imageUrl }= item
    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
            <NameContainer>{name}</NameContainer>
            <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => AddItem(item)} inverted>
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps= dispatch => ({
    AddItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)