export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

  if (existingCartItem) {
    return cartItems.map(cartItem => // returns new array, so state version is changed and re-rendered
      cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem

      )
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1 }]
}
