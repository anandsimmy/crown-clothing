import React from 'react'
import { connect } from 'react-redux'

import './checkout-item-styles.scss'
import { addItemInAllCarts, subtractItemInAllCarts, clearItemInAllCarts } from '../../redux/cart/cart-actions'

const CheckoutItem= ({ cartItem, add, subtract, clear })  => {
    const { name, quantity, price, imageUrl } = cartItem
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
        <div className='arrow' onClick={()=>subtract(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
        <div className='arrow' onClick={()=>add(cartItem)}>&#10095;</div>
    </span>
    <span className='price'>{price}</span>
    <div className='remove-button' onClick={()=>clear(cartItem)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps= dispatch => ({
    add: item => dispatch(addItemInAllCarts(item)),
    subtract: item => dispatch(subtractItemInAllCarts(item)),
    clear: item => dispatch(clearItemInAllCarts(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)