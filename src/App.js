import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils' // need to import currentuser state here. hence used class componenet
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'

class App extends React.Component {
  unsubscribeFromAuth = null // onAuthStateChanged is an OPEN subscription between app and firebase. need to close it when user signs out, otherwise there will be memory leaks from our app. null is assigned as default value here.

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // componentdidmount will only fetch data once. we want to always know if user is signed in our out. hence auth.onAuthStateChanged is a method from firebase that helps to do that. firebase gives persistence of user until signed out
      // this.setState({ currentUser: user });
      // console.log(user) // user object gives us all the impt stuff like name, email
    // createUserProfileDocument(user)
      if (userAuth) { // userauth is big user object returned from firebase
        const userRef = await createUserProfileDocument(userAuth); // check if DB has updated with new data

        userRef.onSnapshot ( snapshot => {  // onSnapshot similar to calling onAuthStateChanged
          setCurrentUser(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            // () => console.log(this.state) // cannot call this after setState as it is asynchronous i.e. setState not finished when u call CL, so need to pass 2nd function inside setState
          );
          // console.log(this.state);
        })
      } else {
        setCurrentUser(userAuth) // if user logs out, set it to null
        // console.log(this.state);
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // closes the subscription
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} /> 
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/signin" render={() => this.props.currentUser ?
            (<Redirect to='/' />) :
            (<SignInAndSignUpPage />)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // dispatch is way for redux to know that w/e object u are passing me is an action object that i will pass to every reducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App); // null here instead of mapStateToProps because we don't need current user at the app level

// If you want a component to listen/subscribe to state changed in store you use connect
