import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import booksReducer from './books';
import bookshelfReducer from './bookshelf';
import uiReducer from './ui';
/*
Export a `rootReducer` function. It should set up:
  1. A `books` slice of state that delegates to the `booksReducer`
  2. A `bookshelf` slice of state that delegates to the `bookshelfReducer`
  3. A `ui` slice of state that delegates to the `uiReducer`
*/
export const rootReducer = combineReducers({
  books: booksReducer,
  bookshelf: bookshelfReducer,
  ui: uiReducer,
}); // YOU WILL NEED TO CHANGE THIS LINE

/*
Export a `configureStore` function as the default export. The function should
take in a `preloadedState` parameter that defaults to `{}`. The function should
also return a store created with the `rootReducer`, `preloadedState`, and
`thunk` middleware.

For debugging purposes, you may include `logger` and the Redux DevTools if you
want, but this is not required. Commented-out code has been included below to
make it easier for you to include these features. Note, however, that the simple
act of uncommenting these lines will not, in and of itself, include these
features.

You do *NOT* need to set up separate production and development environments.
*/
let enhancer = applyMiddleware();
export default function configureStore (preloadedState = {}) {
  return createStore(rootReducer, preloadedState, enhancer)
}

// Uncommenting the 3 lines below will help if you want to include logger and/or
// the Redux DevTools:
//
// const logger = require("redux-logger").default;
// const composeEnhancers =
//    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;