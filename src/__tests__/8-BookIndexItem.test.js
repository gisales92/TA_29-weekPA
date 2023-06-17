import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import BookIndexItem from '../components/BookIndexItem'
import { returnBook, checkOutBook } from '../store/bookshelf';
import books from '../mockData/mockBooks.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useDispatch: jest.fn(),
}));

jest.mock('../store/bookshelf', () => ({
  returnBook: jest.fn(),
  checkOutBook: jest.fn()
}));

jest.mock('../store/ui', () => ({
  setShowForm: jest.fn()
}));

const dispatch = jest.fn();

describe('BookIndexItem', () => {
  let book; 
  const bookId = 3; // Set `bookId` to a number 1-5

  beforeEach(() => {
    book = books[bookId];
    useDispatch.mockImplementation(() => dispatch);
  });

  it('should be a function', () => {
    expect(typeof BookIndexItem).toEqual('function');
  });

  it('should show the book\'s `title` and `author`', () => {
    render(<BookIndexItem book={book} shelf={false} />);
    expect(screen.getByText(new RegExp(book.title))).toBeTruthy();
    expect(screen.getByText(new RegExp(book.author))).toBeTruthy();
  });

  it('should have a button to return the book if part of a Bookshelf', async () => {
    returnBook.mockImplementation(id => id);
    render(<BookIndexItem book={book} shelf={true} />);
    let returnButton = screen.getByRole('button');

    // click on Return button with mock book object
    const user = userEvent.setup();
    expect(returnBook).not.toHaveBeenCalled();
    await user.click(returnButton);
    expect(returnBook).toBeCalledWith(`${bookId}`);
    expect(dispatch).toBeCalledWith(
      returnBook.mock.results[0].value
    )
  });
  
  it('should have a button to check out the book if part of the Library', async () => {
    checkOutBook.mockImplementation(id => id);
    render(<BookIndexItem book={book} shelf={false} />);
    let checkOutButton = screen.getByRole('button');

    // click on Check Out button with mock book object
    const user = userEvent.setup();
    expect(checkOutBook).not.toHaveBeenCalled();
    await user.click(checkOutButton);
    expect(checkOutBook).toBeCalledWith(`${bookId}`);
    expect(dispatch).toBeCalledWith(
      checkOutBook.mock.results[0].value
    )
  });
});