import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { receiveBook } from '../store/books';
import { setShowForm } from '../store/ui';
/*
Export a `BookForm` component that renders a form to create a book. The form
should have an `<h1>` header at the top that says `New Book`. Use controlled
inputs for `title` and `author`. Use `nanoid()` to set the id.

Label the `title` field `Title`; label the `author` field `Author`. Use a text
input for both.

The form should have two buttons at the bottom: `Create` and `Cancel`. The form
should create the book in the store when `Create Book` is clicked. Once the form
is submitted or canceled, you should set `showForm` to `false` so that the form
will no longer be displayed.
*/

export default function BookForm () {
    const [form, setForm] = useState({title: "", author: ""})
    const dispatch = useDispatch();

    const updatedState = field => e => {
        setForm({...form, [field]: e.currentTarget.value})
    }

    const onSubmit = type => e => {
        e.preventDefault();
        if (type === "submit") {
            dispatch(receiveBook({...form, id: nanoid()}))
        }
        dispatch(setShowForm(false))
    }

    return (
        <form onSubmit={onSubmit("submit")}>
            <h2>New Book</h2>
            <label>
                Title
                <input type="text" onChange={updatedState("title")} value={form.title}></input>
            </label>
            <label>
                Author
                <input type="text" onChange={updatedState("author")} value={form.author}></input>
            </label>
            <button type="submit">Create</button>
            <button onClick={onSubmit("cancel")}>Cancel</button>
        </form>
    );
}