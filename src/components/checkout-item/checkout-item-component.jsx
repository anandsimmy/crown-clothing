import React from 'react'
import { connect } from 'react-redux'

import './checkout-item-styles.scss'
import { clearItem, addItem, decrementItemQuantity } from '../../redux/cart/cart-actions'

const CheckoutItem= ({ cartItem, clearItem, addItemQuantity, decrementItemQuantity })  => {
    const { name, quantity, price, imageUrl } = cartItem
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
        <div className='arrow' onClick={()=>decrementItemQuantity(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
        <div className='arrow' onClick={()=>addItemQuantity(cartItem)}>&#10095;</div>
    </span>
    <span className='price'>{price}</span>
    <div className='remove-button' onClick={()=>clearItem(cartItem)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps= dispatch => ({
    clearItem: item => dispatch(clearItem(item)),
    addItemQuantity: item => dispatch(addItem(item)),
    decrementItemQuantity: item => dispatch(decrementItemQuantity(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)