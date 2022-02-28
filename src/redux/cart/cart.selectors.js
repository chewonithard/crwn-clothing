import { createSelector } from "reselect";

const selectCart = (state) => state.cart; // input selector; gets the whole reducer state but only want a slice of it i.e. state.cart

export const selectCartItems = createSelector(
  // takes 2 arguments, a collection/array of input selector + a func that returns the value we want out of the selector
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

//selector responsibilty is return the same output if it receive the same input, skipping calculation, it able to return the same reference

//  if mapStateToProp doesnt receive the same input, it will rerender, if the input is reference, selector able to return the same reference for mapStateToProp

// memoization is done inside selector, which is the main reason you install the library
