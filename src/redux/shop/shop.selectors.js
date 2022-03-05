import { createSelector } from 'reselect'

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = state => state.shop // because of redux, state always points to rootreducer

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollection = collectionUrlParam =>
  createSelector (
    [selectCollections],
    collections => collections[collectionUrlParam]
  )


// export const selectCollection = collectionUrlParam =>
//   createSelector (
//     [selectCollections],
//     collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
//   )


  // const mapStateToProps = (state, ownProps) => ({
  //   // ownProps is the props of the component that is wrapped in connect
  //   collection: selectCollection(ownProps.match.params.collectionId)(state),
  // });

  export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
  )
