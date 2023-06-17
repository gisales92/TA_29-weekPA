import { useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from '../App';
import BookIndex from '../components/BookIndex';
import BookForm from '../components/BookForm';
import { getShowForm } from '../store/ui';
import { populateBooks } from '../store/books';
import booksDB from '../mockData/mockBooks.json';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../store/books', () => ({
  populateBooks: jest.fn()
}));

jest.mock('../store/ui', () => ({
  getShowForm: jest.fn()
}));

// Mock BookIndex
jest.mock('../components/BookIndex', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

// Mock BookForm
jest.mock('../components/BookForm', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

const dispatch = jest.fn();

describe('App', () => {
  beforeEach(() => {
    populateBooks.mockImplementation(() => booksDB);
    useSelector.mockImplementation(callback => callback());
    useDispatch.mockImplementation(() => dispatch);
    BookIndex.mockImplementation(() => <li>BookIndex</li>);
    BookForm.mockImplementation(() => <li>BookForm</li>);
  });

  it ('should update `showForm` dynamically', () => {
    getShowForm.mockReturnValueOnce(-1);
    const { rerender } = render(<App />);
    expect(screen.getByTitle("form")).toBeTruthy();
    
    getShowForm.mockReturnValueOnce(false);
    rerender(<App />);
    expect(() => screen.getByTitle("form")).toThrow();
  });

  it ('should load the sample books into the store', () => {
    render(<App />);
    expect(dispatch).toBeCalledWith(booksDB);
  });

  it ('should not load the books more than once', () => {
    getShowForm.mockReturnValueOnce(true);
    const { rerender } = render(<App />);
    getShowForm.mockReturnValueOnce(false);
    rerender(<App />);
    expect(dispatch).toBeCalledTimes(1);
  });
});