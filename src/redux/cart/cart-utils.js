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