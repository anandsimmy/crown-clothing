import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton=({ price }) => {

    const priceForStripe= price * 100
    const publishableKey= 'pk_test_N79er5ZuNgz6i2YVAKd4vcg600SPFxOE4X'

    const onToken=(token) => {
        axios({
            url: 'payment',
            method: 'post',
            data:{
                amount: priceForStripe,
                token,
            }
        }).then((success) => {
            console.log('Payment success: ', success)
            alert('Payment Successful for '+ price+ '₹')
        }).catch((error) => {
            console.log('Payment error: ', error)
            alert('Payment failed. Please try again with the test credit card provided')
        })
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing Pvt Ltd.'
            shippingAddress
            billingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ₹${price}`}
            amount={priceForStripe}
            panelLabel='Pay'
            token={onToken}
            currency='INR'
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton