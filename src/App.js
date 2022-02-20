import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils' // need to import currentuser state here. hence used class componenet

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null // onAuthStateChanged is an OPEN subscription between app and firebase. need to close it when user signs out, otherwise there will be memory leaks from our app. null is assigned as default value here.

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // componentdidmount will only fetch data once. we want to always know if user is signed in our out. hence auth.onAuthStateChanged is a method from firebase that helps to do that. firebase gives persistence of user until signed out
      // this.setState({ currentUser: user });
      // console.log(user) // user object gives us all the impt stuff like name, email
    // createUserProfileDocument(user)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // check if DB has updated with new data

        userRef.onSnapshot ( snapshot => {  // onSnapshot similar to calling onAuthStateChanged
          // cl snapshot
          // cl snapshot.data() has no id
          this.setState(
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
        this.setState({currentUser: userAuth}) // if user logs out, set it to null
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
