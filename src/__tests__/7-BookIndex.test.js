import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import BookIndex from '../components/BookIndex';
import BookIndexItem from '../components/BookIndexItem';
import { getAvailableBooks } from '../store/books';
import { returnAllBooks, getBooksOnShelf } from '../store/bookshelf';
import { setShowForm } from '../store/ui';
import books from '../mockData/mockBooks.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../store/books', () => ({
  getAvailableBooks: jest.fn()
}));

jest.mock('../store/bookshelf', () => ({
  returnAllBooks: jest.fn(),
  getBooksOnShelf: jest.fn()
}));

jest.mock('../store/ui', () => ({
  setShowForm: jest.fn()
}));


// Mock BookIndexItem
jest.mock('../components/BookIndexItem', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

const dispatch = jest.fn();

describe('BookIndex', () => {
  
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    getAvailableBooks.mockImplementation(() => [books[3], books[4], books[5]]);
    getBooksOnShelf.mockImplementation(() => [books[1], books[2]]);
    useSelector.mockImplementation(callback => callback());
    BookIndexItem.mockImplementation(() => <li>BookIndexItem</li>);
  });

  it('should render a BookIndexItem for each book, passing each book as a `book` prop and `shelf` as a `shelf` prop', () => {
    let mockResult = Object.values(books);
    useSelector.mockImplementation(() => mockResult);
    const { rerender } = render(<BookIndex shelf={false} />);
    const bookIndexItems = screen.getAllByRole('listitem');
    expect(bookIndexItems.length).toBe(5);
    expect(BookIndexItem.mock.calls[0][0]).toEqual({ book: books[1], shelf: false });
    expect(BookIndexItem.mock.calls[4][0]).toEqual({ book: books[5], shelf: false });
    
    BookIndexItem.mockClear();

    // Render again with a different number of books
    mockResult = [...mockResult, { id: 6 }];
    rerender(<BookIndex shelf={false}/>);
    const newBookIndexItems = screen.getAllByRole('listitem');
    expect(newBookIndexItems.length).toBe(6);
    expect(BookIndexItem.mock.calls[5][0].book).toEqual({ id: 6 });
  });

  it('should display `Available Books` when rendering the library, "Your Bookshelf" when rendering the Bookshelf', () => {
    const { rerender } = render(<BookIndex shelf={false} />);
    expect(() => screen.getByText('Available Books')).not.toThrow();
    expect(() => screen.getByText('Your Bookshelf')).toThrow();
    
    rerender(<BookIndex shelf={true} />);
    expect(() => screen.getByText('Available Books')).toThrow();
    expect(() => screen.getByText('Your Bookshelf')).not.toThrow();
  });

  it('should display the available books when rendering the library, the books on the shelf when rendering the Bookshelf', () => {
    const { rerender } = render(<BookIndex shelf={false} />);
    expect(getAvailableBooks).toBeCalled();
    expect(getBooksOnShelf).not.toBeCalled();
    expect(screen.getAllByRole('listitem').length).toEqual(3);
    
    jest.clearAllMocks();
    
    rerender(<BookIndex shelf={true} />);
    expect(getAvailableBooks).not.toBeCalled();
    expect(getBooksOnShelf).toBeCalled();
    expect(screen.getAllByRole('listitem').length).toEqual(2);
  });

  it('should display a `New Book` button when rendering the library, a "Return All" button when rendering the Bookshelf', () => {
    const { rerender } = render(<BookIndex shelf={false} />);
    expect(screen.getByRole('button')).toHaveTextContent('New Book');
    expect(screen.getByRole('button')).not.toHaveTextContent('Return All');
    
    rerender(<BookIndex shelf={true} />);
    expect(screen.getByRole('button')).not.toHaveTextContent('New Book');
    expect(screen.getByRole('button')).toHaveTextContent('Return All');
  });

  it('should display a `Create Book` form when the `New Book` button is clicked', async () => {
    setShowForm.mockImplementation(val => val);
    render(<BookIndex shelf={false} />);
    const newButton = screen.getByRole('button');

    // click on Delete button with mock report object
    const user = userEvent.setup();
    expect(setShowForm).not.toHaveBeenCalled();
    await user.click(newButton);
    expect(setShowForm).toBeCalledWith(true);
    expect(returnAllBooks).not.toBeCalled();
    expect(dispatch).toBeCalledWith(
      setShowForm.mock.results[0].value
    )
  });

  it('should return all books from the shelf when `Return All` is clicked', async () => {
    returnAllBooks.mockImplementation(() => 1);
    render(<BookIndex shelf={true} />);
    const newButton = screen.getByRole('button');

    // click on Delete button with mock report object
    const user = userEvent.setup();
    expect(returnAllBooks).not.toHaveBeenCalled();
    await user.click(newButton);
    expect(returnAllBooks).toBeCalled();
    expect(setShowForm).not.toBeCalled();
    expect(dispatch).toBeCalledWith(
      returnAllBooks.mock.results[0].value
    )
  });
});