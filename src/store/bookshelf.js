/*
Export both the following action constants and their corresponding actions:
  1. `CHECK_OUT_BOOK` (corresponding action should have a `bookId` payload)
  2. `RETURN_BOOK` (corresponding action should have a `bookId` payload)
  3. `RETURN_ALL_BOOKS` (corresponding action does not need a payload)
*/
export const CHECK_OUT_BOOK = "bookshelf/CHECK_OUT_BOOK";
export const RETURN_BOOK = "bookshelf/RETURN_BOOK";
export const RETURN_ALL_BOOKS = "bookshelf/RETURN_ALL_BOOKS";

export const checkOutBook = (bookId) => {
  return {
    type: CHECK_OUT_BOOK,
    bookId,
  }
}

export const returnBook = (bookId) => {
  return {
    type: RETURN_BOOK,
    bookId,
  }
}

export const returnAllBooks = () => {
  return {
    type: RETURN_ALL_BOOKS,

  }
}

/*
Export a `getBooksOnShelf` selector that returns an array of all the books--not
just the book ids--that are on the shelf.
*/
export const getBooksOnShelf = ({ books, bookshelf }) => {
  const booksOnShelf = [];
  bookshelf?.forEach(id => {
    booksOnShelf.push(books[id])
  })
  return booksOnShelf;
}
/*
Export a `bookshelfReducer` function as the default export. It should take in
the old state and appropriately handle all bookshelf actions.
*/
export default function bookshelfReducer (state = [], action) {
  switch (action.type) {
    case CHECK_OUT_BOOK:
      const checkedOutState = [...state];
      checkedOutState.push(action.bookId);
      return checkedOutState;
    case RETURN_BOOK:
      const returnedState = [...state];
      const index = returnedState.indexOf(action.bookId)
      returnedState.splice(index, 1);
      return returnedState;
    case RETURN_ALL_BOOKS:
      const returnedAllBooks = [];
      return returnedAllBooks;
    default:
    return state;
  }
};