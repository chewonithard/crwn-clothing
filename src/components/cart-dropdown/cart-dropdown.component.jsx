import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropDown = ({ toggleCartHidden, cartItems }) => {
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/checkout");
  // }

  return (
  <div className='cart-dropdown'>
    <div className='cart-items'>
     {
       cartItems.length ?
       cartItems.map( cartItem => {
        return <CartItem key={cartItem.id} item={cartItem}/>
       })
       :
       <span className='empty-message'>Your cart is empty</span>
     }
    </div>
    <Link to='/checkout'>
      <CustomButton onClick={toggleCartHidden}>GO TO CHECKOUT</CustomButton>
    </Link>
  </div>
)}

// const mapStateToProps = state => ({ // state here is root reducer
//   cartItems: state.cart.cartItems
// })

const mapStateToProps = state => ({
  cartItems: selectCartItems(state) // memoization from cart.selectors.js // memoize : allow us to memoize and not re-render a component if the state value does not change
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})


export default connect(mapStateToProps, mapDispatchToProps)(CartDropDown)
