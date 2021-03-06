import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { toggleCartHidden } from "../../redux/cart/cart.actions"
import './cart-icon.styles.scss'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'


const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

// const mapStateToProps = ( {cart: { cartItems }}) => ({ // state here is rootreducer // destructuring syntax off the props
//   itemCount: cartItems.reduce(
//     (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0
//   )
//  })

const mapStateToProps = state => ({ // using selector instead
  itemCount: selectCartItemsCount(state)
 })

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
