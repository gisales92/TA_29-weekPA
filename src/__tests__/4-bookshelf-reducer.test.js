/*
This file tests the bookshelfReducer in `../store/bookshelf`. 
*/
import bookshelfReducer, * as bookshelfActions from '../store/bookshelf';

describe('bookshelfReducer', () => {
  let oldState, action, state;
  const bookId = "2";

  beforeEach(() => {
    oldState = { 2: 'oldState' };
  })

  it('should be a function exported as the default', () => {
    expect(typeof bookshelfReducer).toEqual('function');
  });

  it('should initialize with an empty array as the default state', () => {
    expect(bookshelfReducer(undefined, {})).toEqual([]);
  });

  it('should return the previous state if an action is not matched', () => {
    const newState = bookshelfReducer(oldState, { type: 'notAType' });
    expect(newState).toBe(oldState);
  });

  describe('handling the CHECK_OUT_BOOK action', () => {
    beforeEach(() => {
      action = {
        type: bookshelfActions.CHECK_OUT_BOOK,
        bookId
      };
      oldState = ["1"];
    });

    it('should add the book\'s id to the state', () => {
      state = bookshelfReducer(undefined, action);
      expect(state).toEqual([bookId]);
    });

    it('should not affect the other book ids in the state', () => {
      state = bookshelfReducer(oldState, action);
      expect(state).toEqual([...oldState, `${bookId}`]);
    });

    it('should not modify the old state', () => {
      bookshelfReducer(oldState, action);
      expect(oldState).toEqual(["1"]);
    });
  });

  describe('handling the RETURN_BOOK action', () => {
    beforeEach(() => {
      action = {
        type: bookshelfActions.RETURN_BOOK,
        bookId
      };
      oldState = ["1", "2", "3"];
    });

    it('should remove the book\'s id from the state', () => {
      state = bookshelfReducer(oldState, action);
      expect(state).toEqual(["1", "3"]);
    });

    it('should not crash if the book\'s id is not found in the state', () => {
      expect(() => state = bookshelfReducer(undefined, action)).not.toThrow();
      expect(state).toEqual([]);
    });

    it('should not modify the old state', () => {
      bookshelfReducer(oldState, action);
      expect(oldState).toEqual(["1", "2", "3"]);
    });
  });

  describe('handling the RETURN_ALL_BOOKS action', () => {
    beforeEach(() => {
      action = {
        type: bookshelfActions.RETURN_ALL_BOOKS
      };
      oldState = ["1", "2", "3"];
    });

    it('should remove all book ids from the state', () => {
      let state = bookshelfReducer(oldState, action);
      expect(state).toEqual([]);
    });

    it('should not modify the old state', () => {
      bookshelfReducer(oldState, action);
      expect(oldState).toEqual(["1", "2", "3"]);
    });
  });
});