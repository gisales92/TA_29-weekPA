// import books from "../mockData/mockBooks.json";
/*
Export both the following action constants and their corresponding actions:
  1. `POPULATE_BOOKS` (corresponding action should have a `books` payload)
  2. `RECEIVE_BOOK` (corresponding action should have a `book` payload)
*/
export const RECEIVE_BOOK = "books/RECEIVE_BOOK";
export const POPULATE_BOOKS = "books/POPULATE_BOOKS";

export const receiveBook = (book) => {
  return {
    type: RECEIVE_BOOK,
    book,
  };
};

export const populateBooks = (books) => {
  return {
    type: POPULATE_BOOKS,
    books,
  };
};
/*
Export a `getAvailableBooks` selector that returns an array of all the books in
the store that are not on the `bookshelf`.


Also export a `getBook` selector that takes in a bookId and returns the given
book from the store.
*/
export const getAvailableBooks = ({books, bookshelf}) => {
  const availableBooks = [];
  if (books) {
    Object.keys(books).forEach((bookId) => {
      if (!bookshelf.includes(bookId)) {
        availableBooks.push(books[bookId]);
      }
    });
  }
  return availableBooks;
};

export const getBook = (bookId) => state => {
  return state.books ? state.books[bookId] : null
};

/*
Export a `booksReducer` function as the default export. It should take in the
old state and appropriately handle all book actions.
*/
export default function booksReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_BOOK:
      const updatedState = {...state};
      updatedState[action.book.id] = action.book;
      return updatedState;
    case POPULATE_BOOKS:
      const populatedState = { ...state };
      Object.keys(action.books).forEach((bookId) => {
        populatedState[bookId] = action.books[bookId];
      });
      return populatedState;
    default:
      return state;
  }
}
