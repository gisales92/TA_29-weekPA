/*
This file tests the booksReducer in `../store/books`. 
*/
import booksReducer, * as bookActions from '../store/books';
import books from '../mockData/mockBooks.json';

describe('booksReducer', () => {
  let oldState;

  beforeEach(() => {
    oldState = { 2: 'oldState' };
  })

  it('should be a function exported as the default', () => {
    expect(typeof booksReducer).toEqual('function');
  });

  it('should initialize with an empty object as the default state', () => {
    expect(booksReducer(undefined, {})).toEqual({});
  });

  it('should return the previous state if an action is not matched', () => {
    const newState = booksReducer(oldState, { type: 'notAType' });
    expect(newState).toBe(oldState);
  });

  describe('handling the POPULATE_BOOKS action', () => {
    let testBooks, action;

    beforeEach(() => {
      testBooks = { 1: 'testbook1', 2: 'testbook2' };
      action = {
        type: bookActions.POPULATE_BOOKS,
        books: testBooks
      };
    });

    it('should replace the state with the action\'s books', () => {
      const state = booksReducer(undefined, action);
      expect(state).toEqual(testBooks);
    });

    it('should not modify the old state', () => {
      booksReducer(oldState, action);
      expect(oldState).toEqual({ 2: 'oldState' });
    });
  });

  describe('handling the RECEIVE_BOOK action', () => {
    let testBook, action;

    beforeEach(() => {
      testBook = books[1];
      action = {
        type: bookActions.RECEIVE_BOOK,
        book: testBook
      };
    });

    it('should add the book to the state using the book `id` as a key', () => {
      let state = booksReducer(undefined, action);
      expect(state[1]).toEqual(testBook);
    });

    it('should not affect the other books in the state', () => {
      let state = booksReducer(oldState, action);
      expect(state[2]).toEqual('oldState');
    });

    it('should not modify the old state', () => {
      booksReducer(oldState, action);
      expect(oldState).toEqual({ 2: 'oldState' });
    });
  });
});