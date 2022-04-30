import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import "./stripe-button.styles.scss"

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51K6xOxCwTh0U0oxnokAkT2NqVadEZBvW4db8NfME3V51q6WquwzHeWWUxtgGir0ldp5FmJ7dK4RXYjnJ3IUQbR5j00zXAgnN5r'

  const onToken = token => {
    console.log(token);
    alert('Payment Successful')
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      bitcoin
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;
