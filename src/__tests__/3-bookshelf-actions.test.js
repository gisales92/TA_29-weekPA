/*
This file tests the non-reducer contents of `../store/bookshelf`. 

It uses a mock store created with the `redux-mock-store` package
(https://www.npmjs.com/package/redux-mock-store).
*/
import configureMockStore from 'redux-mock-store';
import * as bookshelfModule from '../store/bookshelf';
import books from '../mockData/mockBooks.json';

const mockStore = configureMockStore();
const bookId = 2;
let store;

describe('bookshelf actions and selector', () => {
  describe('bookshelf constants', () => {
    it('should export a `CHECK_OUT_BOOK` constant with a value of "bookshelf/CHECK_OUT_BOOK"', () => {
      expect(bookshelfModule.CHECK_OUT_BOOK).toEqual('bookshelf/CHECK_OUT_BOOK');
    });

    it('should export a `RETURN_BOOK` constant with a value of "bookshelf/RETURN_BOOK"', () => {
      expect(bookshelfModule.RETURN_BOOK).toEqual('bookshelf/RETURN_BOOK');
    });

    it('should export a `RETURN_ALL_BOOKS` constant with a value of "bookshelf/RETURN_ALL_BOOKS"', () => {
      expect(bookshelfModule.RETURN_ALL_BOOKS).toEqual('bookshelf/RETURN_ALL_BOOKS');
    });
  });

  describe('bookshelf actions', () => {
    describe('checkOutBook', () => {
      it('should export an `checkOutBook` function', () => {
        expect(typeof bookshelfModule.checkOutBook).toEqual('function');
      });

      it('should return an appropriate action', () => {
        store = mockStore({});
        const expectedActions = [{ type: bookshelfModule.CHECK_OUT_BOOK, bookId }];
        store.dispatch(bookshelfModule.checkOutBook(bookId));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('returnBook', () => {
      it('should export a `returnBook` function', () => {
        expect(typeof bookshelfModule.returnBook).toEqual('function');
      });

      it('should return an appropriate action', () => {
        store = mockStore({});
        const expectedActions = [{ type: bookshelfModule.RETURN_BOOK, bookId }];
        store.dispatch(bookshelfModule.returnBook(bookId));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('returnAllBooks', () => {
      it('should export a `returnAllBooks` function', () => {
        expect(typeof bookshelfModule.returnAllBooks).toEqual('function');
      });

      it('should return an appropriate action', () => {
        store = mockStore({});
        const expectedActions = [{ type: bookshelfModule.RETURN_ALL_BOOKS }];
        store.dispatch(bookshelfModule.returnAllBooks());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('bookshelf selector', () => {
    describe('getBooksOnShelf', () => {
      it('should export a `getBooksOnShelf` function', () => {
        expect(typeof bookshelfModule.getBooksOnShelf).toEqual('function');
      });

      it('should return an array of all the books in the store that are not on the bookshelf', () => {
        store = mockStore({ books, bookshelf: ["2", "4"] });
        expect(bookshelfModule.getBooksOnShelf(store.getState()))
          .toEqual([
            books[2],
            books[4]
          ]);
      });

      it('should appropriately handle an empty store', () => {
        store = mockStore({});
        expect(() => bookshelfModule.getBooksOnShelf(store.getState())).not.toThrow();
        expect(bookshelfModule.getBooksOnShelf(store.getState())).toEqual([]);
      });
    });
  });
});