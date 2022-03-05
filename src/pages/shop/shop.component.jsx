import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component'

const ShopPage = ({ match }) => ( // have access to match because in app.js, shopPage is nested in a route, route passes 3 objects to our component as props: match, location and history
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
)

// match.path gives u /shop
// :collectionId is passed as params to collectionpage

export default ShopPage
