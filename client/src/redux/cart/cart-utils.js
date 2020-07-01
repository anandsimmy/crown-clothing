export const addItemToCart=(cartItems, itemToAdd) => {
    const existingItem= cartItems.find(
        cartItem => cartItem.id === itemToAdd.id)
    //if item already exists in cart then increase its quantity
    if(existingItem){
        return cartItems.map(cartItem => (
            cartItem.id === itemToAdd.id ? 
                { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem 
        ))
    }
    //attach a quantity property to item object
    return [...cartItems, { ...itemToAdd, quantity: 1 }]
} 

export const decrementItemQuantity=(cartItems, itemToDecrementQuantity) => {
    if(itemToDecrementQuantity.quantity === 1){
        //removing item from cart if quantity is going to be zero
        return cartItems.filter(cartItem => (
            cartItem.id !== itemToDecrementQuantity.id
        ))
    }
    return cartItems.map(cartItem => (
        cartItem.id === itemToDecrementQuantity.id ?
            {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    ))
}