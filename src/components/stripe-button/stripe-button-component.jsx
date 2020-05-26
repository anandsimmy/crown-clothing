import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton=({ price }) => {

    const priceForStripe= price * 100
    const publishableKey= 'pk_test_N79er5ZuNgz6i2YVAKd4vcg600SPFxOE4X'

    const onToken=(token) => {
        console.log(token)
        alert(`Payment Successful for $${price}`)
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing Pvt Ltd.'
            shippingAddress
            billingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton