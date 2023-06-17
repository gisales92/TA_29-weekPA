/*
This file tests the non-reducer contents of `../store/books`. 

It uses a mock store created with the `redux-mock-store` package
(https://www.npmjs.com/package/redux-mock-store).
*/
import configureMockStore from 'redux-mock-store';
import * as booksModule from '../store/books';
import books from '../mockData/mockBooks.json';

const mockStore = configureMockStore();
const bookId = 2; // Set to 1-5
let store;

describe('book actions and selectors', () => {
  describe('book constants', () => {
    it('should export a `RECEIVE_BOOK` constant with a value of "books/RECEIVE_BOOK"', () => {
      expect(booksModule.RECEIVE_BOOK).toEqual('books/RECEIVE_BOOK');
    });

    it('should export a `POPULATE_BOOKS` constant with a value of "books/POPULATE_BOOKS"', () => {
      expect(booksModule.POPULATE_BOOKS).toEqual('books/POPULATE_BOOKS');
    });
  });

  describe('book actions', () => {
    beforeEach(() => {
      store = mockStore({ books: {} });
    });

    describe('receiveBook', () => {
      it('should export a `receiveBook` function', () => {
        expect(typeof booksModule.receiveBook).toEqual('function');
      });

      it('should return an appropriate action', () => {
        const expectedActions = [{ type: booksModule.RECEIVE_BOOK, book: books[bookId] }];
        store.dispatch(booksModule.receiveBook(books[bookId]));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('populateBooks', () => {
      it('should export a `populateBooks` function', () => {
        expect(typeof booksModule.populateBooks).toEqual('function');
      });

      it('should return an appropriate action', () => {
        const expectedActions = [{ type: booksModule.POPULATE_BOOKS, books }];
        store.dispatch(booksModule.populateBooks(books));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('book selectors', () => {
    beforeEach(() => {
      store = mockStore({ books, bookshelf: ["2", "4"] });
    });

    describe('getAvailableBooks', () => {
      it('should export a `getAvailableBooks` function', () => {
        expect(typeof booksModule.getAvailableBooks).toEqual('function');
      });

      it('should return an array of all the books in the store that are not on the bookshelf', () => {
        expect(booksModule.getAvailableBooks(store.getState()))
          .toEqual([
            books[1],
            books[3],
            books[5]
          ]);
      });

      it('should appropriately handle an empty store', () => {
        store = mockStore({});
        expect(() => booksModule.getAvailableBooks(store.getState())).not.toThrow();
        expect(booksModule.getAvailableBooks(store.getState())).toEqual([]);
      });
    });

    describe('getBook', () => {
      it('should export a `getBook` function', () => {
        expect(typeof booksModule.getBook).toEqual('function');
      });

      it('should return the book corresponding to the bookId passed as a parameter', () => {
        expect(booksModule.getBook(bookId)(store.getState())).toEqual(books[bookId]);
      });

      it('should appropriately handle an empty store', () => {
        expect(() => booksModule.getBook({})).not.toThrow();
        expect(booksModule.getBook(bookId)({})).toEqual(null);
      });
    });
  });
});