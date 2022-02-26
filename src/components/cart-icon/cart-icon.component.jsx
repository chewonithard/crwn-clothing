import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { toggleCartHidden } from "../../redux/cart/cart.actions"
import './cart-icon.styles.scss'


const CartIcon = ({ toggleCartHidden, cartItems }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{`${cartItems.length}`}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = ( {cart: { cartItems }}) => ({ // state here is rootreducer // destructuring syntax off the props
  cartItems,
 })

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
