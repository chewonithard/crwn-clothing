import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
})

ReactDOM.render(
  // Provider is a component class from redux that once passed the store object, will be able to give store context of the rest of the application, so that we can dispatch actions to the store or pull values from the store into components
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
       <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
