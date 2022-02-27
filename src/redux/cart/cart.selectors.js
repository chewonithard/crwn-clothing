import { createSelector } from 'reselect'

const selectCart = state => state.cart; // input selector; gets the whole reducer state but only want a slice of it i.e. state.cart

export const selectCartItems = createSelector ( // takes 2 arguments, a collection/array of input selector + a func that returns the value we want out of the selector
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  )
);
