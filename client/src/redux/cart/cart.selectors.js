import {
  createSelector
} from 'reselect';

//input selector (doesn't use createdSelector)
const selectCart = state => state.cart

//output selector (uses input selectors and createSelector to build themselves)

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  )
)

export const selectCartHidden = createSelector(
  selectCart,
  cart => cart.hidden
)

export const selectCartTotal = createSelector(
  selectCartItems,
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  ))