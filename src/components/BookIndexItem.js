import React from "react";
import { useDispatch } from "react-redux";
import { returnBook, checkOutBook } from "../store/bookshelf";

/*
Export a `BookIndexItem` component that takes in a `book` and a Boolean `shelf`
as props. The component should render an `li` containing the following:
  1. The book's title and author.
  2. If it is part of a Bookshelf (i.e., `shelf` is `true`), a `Return` button
     that will return the book.
  3. If it is for the Library (i.e., `shelf` is `false`), a `Check Out` button
     that will check the book out to the bookshelf.
*/
export default function BookIndexItem({ book, shelf }) {
  const dispatch = useDispatch();
  return (
    <li>
      {`${book.title}, by ${book.author}`}
      {shelf ? (
        <button onClick={e => dispatch(returnBook(book.id))}>Return</button>
      ) : (
        <button onClick={e => dispatch(checkOutBook(book.id))}>Check Out</button>
      )}
    </li>
  );
}
