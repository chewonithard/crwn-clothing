import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'
import CartIcon from '../cart-icon/cart-icon.component'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux' // a higher order component to modify our componets to have access to redux store
import CartDropDown from '../cart-dropdown/cart-dropdown.component'
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'></Logo>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      <Link className='option' to='/'>CONTACT</Link>
      {
        currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
        : (
        <Link className='option' to='/signin'>SIGN IN</Link>)
      }
      <CartIcon />
    </div>
    {
      hidden ? null :
    <CartDropDown />
    }
  </div>
)

// const mapStateToProps = (state) => ({ // state here is rootreducer // destructuring syntax off the props
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// })

const mapStateToProps= createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header) // get null value as current user passed to header
