import { useDispatch, useSelector } from "react-redux";
import { getAvailableBooks } from "../store/books";
import { returnAllBooks, getBooksOnShelf } from "../store/bookshelf";
import { setShowForm } from "../store/ui";
import BookIndexItem from "./BookIndexItem";
/*
Export a `BookIndex` component that renders a list (`ul`) of `BookIndexItems`.
You will use this component to render the indexes for both the Library's list of
available books and for the list of books on your Bookshelf. The component
should receive a prop of `shelf`; if `shelf` is `true` then the component should
render the Bookshelf version.

The component should render an `h2` heading before the `ul`. For the Library
heading, the text should be "Available Books"; for the Bookshelf, it should be
"Your Bookshelf".

For the Library version, the `ul` should render the books still available; for
the Bookshelf version, it should render the books on the shelf. (Look at the
imports if you need help.)

After the `ul`, the component should render a button. For the Library version,
the button should say "New Book" and call `showSetForm` with an argument of
`true` when clicked. For the Bookshelf version, the button should say "Return
All" and call `returnAllBooks` when clicked.
*/

export default function BookIndex({ shelf }) {
  const books = useSelector(shelf ? getBooksOnShelf : getAvailableBooks);
  const dispatch = useDispatch();
//   const booksOnShelf = getBooksOnShelf({ books, bookshelf });
//   const booksNotOnShelf = getAvailableBooks({ books, bookshelf });
const handleClick = () => {
    dispatch(shelf ? returnAllBooks() : setShowForm(true))
}


    return (
      <>
        <h2>{shelf ? "Your Bookshelf" : "Available Books"}</h2>
        <ul>
          {books.map((bookObj) => {
            return (
                <BookIndexItem book={bookObj} shelf={shelf} key={bookObj.id}/>
            );
          })}
        </ul>
        <button onClick={handleClick}>{shelf? "Return All" : "New Book"}</button>
      </>
    );

}
