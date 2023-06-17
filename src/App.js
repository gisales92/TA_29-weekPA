import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookIndex from './components/BookIndex';
import BookForm from './components/BookForm';
import { getShowForm } from './store/ui';
import { populateBooks } from './store/books';
import booksDB from '../src/mockData/mockBooks.json';
/*
This file is mostly complete; you just need to make two changes:

1. Change the `showForm` declaration so that the variable will update whenever
   `showForm` is updated in the store.

2. Populate the `books` slice of state with the contents of `booksDB` once this
   component has rendered. You should ensure that you do not do this more than
   once, regardless of how many times the component re-renders.
*/
const App = () => {
  const showForm = useSelector(getShowForm); // You will need to change this line!
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(populateBooks(booksDB))
  }, [dispatch])

  // DO NOT MODIFY THE CODE BELOW
  return (
    <div className={"library" + (showForm ? " show-form" : "")}
         title={showForm ? "form" : ""}
    >
      <h1 className="title">aA Lending Library</h1>
      <div className="books">
        <BookIndex shelf={false}/>
      </div>
      <div className="bookshelf">
        <BookIndex shelf={true}/>
      </div>
      <div className="form">
        {showForm ? <BookForm /> : undefined}
      </div>
    </div>
  )
}

export default App;