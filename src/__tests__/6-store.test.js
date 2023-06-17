/*
This initial comment contains implementation details for test maintainers; it
can be skipped by those who are taking the test.

To mock `rootReducer` in the configureStore test, this test file uses
`babel-plugin-rewire`
(https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md). This
plugin supplies access to `rootReducer` through the named `__RewireAPI__` object
that it attaches to a file's default export. 

The babel plugin is specified in __package.json__. To enable create-react-app to
recognize this change to babel's configuration without ejecting, this project
uses `react-app-rewired` (https://www.npmjs.com/package/react-app-rewired). The
relevant scripts in the __package.json__ have been edited to use this package
instead of `react-scripts`.

Note: `react-app-rewired` requires a __config-overrides.js__ file in the root
directory (present but empty in this project). 
*/
import booksReducer, { RECEIVE_BOOK } from '../store/books';
import bookshelfReducer, { CHECK_OUT_BOOK } from '../store/bookshelf';
import uiReducer, { SET_SHOW_FORM } from '../store/ui';
import configureStore, { rootReducer, __RewireAPI__ as storeModule } from '../store';
import { createStore } from 'redux';

describe('rootReducer', () => {
  let store;
  beforeAll(() => {
    store = createStore(rootReducer);
  });

  it('should be a function', () => {
    expect(typeof rootReducer).toEqual('function');
  });

  it('should include the `booksReducer` under the key `books`', () => {
    const action = { type: RECEIVE_BOOK, book: { id: 1 }};
    store.dispatch(action);
    expect(store.getState().books).toEqual(
      booksReducer({}, action)
    );
  });
  
  it('should include the `bookshelfReducer` under the key `bookshelf`', () => {
    const action = { type: CHECK_OUT_BOOK, bookId: 1 };
    store.dispatch(action);
    expect(store.getState().bookshelf).toEqual(
      bookshelfReducer([], action)
    );
  });
  
  it('should include the `uiReducer` under the key `ui`', () => {
    const action = { type: SET_SHOW_FORM, showForm: true };
    store.dispatch(action);
    expect(store.getState().ui).toEqual(
      uiReducer({}, action)
    );
  });
});

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    // Mock rootReducer with a function that returns a mock state.  
    storeModule.__set__('rootReducer', () => ({ storeKey: 'storeValue' }));
  });

  beforeEach(() => {
    // The first test assures that `configureStore` is a function. Since this
    // code runs before the first test, it contains a conditional to ensure that
    // `configureStore` will not be invoked if it is not a function.
    if (typeof configureStore === 'function') store = configureStore();
  });

  afterAll(() => {
    storeModule.__ResetDependency__('rootReducer');
  });

  it('should be a function that is the default export', () => {
    expect(typeof configureStore).toEqual('function');
  });

  it('should create a store when invoked', () => {
    store.dispatch({type: 'ACTION'});
    expect(store.getState()).toEqual({ storeKey: 'storeValue' });
  });

  it('should set the initial state of the store to `{}`', () => {
    storeModule.__set__('rootReducer', state => {
      return state;
    });
    store = configureStore();
    expect(store.getState()).toEqual({});
  });
});