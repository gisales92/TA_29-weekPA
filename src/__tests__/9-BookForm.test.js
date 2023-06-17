import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import BookForm from '../components/BookForm';
import { receiveBook } from '../store/books';
import { setShowForm } from '../store/ui';

/* jest globals */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual react-redux for non-hooks
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../store/books', () => ({
  receiveBook: jest.fn()
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn()
}));

jest.mock('../store/ui', () => ({
  setShowForm: jest.fn()
}));

const dispatch = jest.fn();

describe('BookForm', () => {
  let titleInput, authorInput, createButton, cancelButton;
  const user = userEvent.setup();
  const id = 'abcd';
  
  beforeEach(() => {
    receiveBook.mockImplementation(book => book);
    setShowForm.mockImplementation(value => value);
    useDispatch.mockImplementation(() => dispatch);
    nanoid.mockImplementation(() => id);
    render(<BookForm />);
  });

  it('should contain a header with the text `New Book`', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('New Book');
  });

  it('should pre-fill `title` and `author` with empty strings', () => {
    titleInput = screen.getByLabelText(/title/i);
    authorInput = screen.getByLabelText(/author/i);
    expect(titleInput).toHaveValue('');
    expect(authorInput).toHaveValue('');
  });

  it('should say `Create` on the submit button', () => {
    //Allow for different button implementations
    createButton = screen.getAllByRole('button').filter(button => {
      return button.value ? /create/i.test(button.value) : 
                            /create/i.test(button.textContent);
    });
    expect(createButton[0]).toBeTruthy();
    expect(createButton[1]).toBeFalsy();
  });

  it('should update the `title` field when it changes', async () => {
    titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'New!');
    expect(titleInput).toHaveValue('New!') 
  });

  it('should update the `author` field when it changes', async () => {
    authorInput = screen.getByLabelText(/author/i);
    await user.type(authorInput, 'Joe');
    expect(authorInput).toHaveValue('Joe')
  });

  it('should set id correctly', async () => {
    createButton = screen.getAllByRole('button').filter(button => {
      return button.value ? /create/i.test(button.value) : 
                            /create/i.test(button.textContent);
    });
    await user.click(createButton[0]);
    const newBook = receiveBook.mock.calls[0][0];
    expect(newBook.id).toEqual(id);
  });
  
  it('should dispatch the correct action when submitted', async() => {
    titleInput = screen.getByLabelText(/title/i);
    authorInput = screen.getByLabelText(/author/i);
    createButton = screen.getAllByRole('button').filter(button => {
      return button.value ? /create/i.test(button.value) : 
                            /create/i.test(button.textContent);
    });
    await user.type(titleInput, 'Great Expectations');
    await user.type(authorInput, 'Charles Dickens');
    await user.click(createButton[0]);

    expect(receiveBook).toBeCalled();
    const newBook = receiveBook.mock.results[0].value;
    expect(newBook.title).toEqual('Great Expectations');
    expect(newBook.author).toEqual('Charles Dickens');
    expect(dispatch).toHaveBeenCalledWith(newBook);
  });

  it('should return to the Library homepage on submit', async() => {
    createButton = screen.getAllByRole('button').filter(button => {
      return button.value ? /create/i.test(button.value) : 
                            /create/i.test(button.textContent);
    });
    expect(setShowForm).not.toHaveBeenCalled();
    await user.click(createButton[0]);
    expect(setShowForm).toBeCalledWith(false);
    expect(dispatch).toBeCalledWith(
      setShowForm.mock.results[0].value
    )
  });

  it('should immediately return to the Library homepage on cancel', async() => {
    cancelButton = screen.getAllByRole('button').filter(button => {
      return button.value ? /cancel/i.test(button.value) : 
                            /cancel/i.test(button.textContent);
    });
    expect(setShowForm).not.toHaveBeenCalled();
    await user.click(cancelButton[0]);
    expect(setShowForm).toBeCalledWith(false);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(
      setShowForm.mock.results[0].value
    )
  });
});