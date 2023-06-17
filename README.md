# React-Redux Practice Assessment

**You will have 1.5 hours for this assessment.**

Read this entire README before running specs for the first time; it contains
important information about running tests with Jest.

In this assessment, you will be creating the aA Lending Library, a small-scale
library simulation. The application will show books in the library and on your
personal bookshelf. You will be able to check books out to your shelf, return
them, and add new books.

## Design Documents

Each book has three fields: `id`, `title`, and `author`.

You will code three components: a `BookIndex`, a `BookIndexItem`, and a
`BookForm`.

The `BookIndex` will be employed twice, once for the library and once for your
personal shelf. Its particular appearance and functionality will depend on the
use case. For example, the library version will have a `New Book` button, while
the shelf version will have a `Return All` button.

The `BookForm` will appear when you click to add a new book to the library. It
does this through the magic of the provided CSS; the project has no links or
routing.

See the wireframes below for a general idea as to what each component should
look like. Note, though, that you do not need to match their styling.

* [View Wireframes][views]

[views]: ./docs/views.md

## Setup

If any step of the setup fails, ask an instructor for help.

1. Open a new Terminal
2. `cd` into the __books__ directory
3. `npm install`

To test your code live in the browser, run:

1. `npm start` runs your app in watch mode so it will update with changes.
2. Navigate to `localhost:3000`.  

## Your task

Your task for this assessment is to supply the code for the 7 files in
__src/store__ and __src/components__. You will also need to make a few
adjustments to __App.js__.

Each file includes the instructions for the code you need to write. Each file
also already includes the `import` statements for the external modules and
functions that you will need.

Except where noted, do not worry about styling or trying to give your app a
pretty display. Functionality is all you need to worry about in this assessment.

## Running specs

You will be testing your code using Jest with React Testing Library. Navigate to
the __books__ folder of the skeleton and run `npm test`. This will enter watch
mode, which will start watching your files for changes and run all the test
specs whenever your files change. To run all of your tests manually instead of
waiting for a file change, use the 'a' command at the watch mode menu. To exit
watch mode, type 'q' (or '^c').

See the 'Debugging Tips' section below for information on how to run a single
spec file.

### Where do the specs live?

For this assessment, Jest specs live in a single __\_\_tests\_\___ folder within
the __src__ folder.

Each test file corresponds to one of the files you will be coding.
(__store/books.js__ and __store/bookshelf.js__ each have two associated test
files, one for the constants / actions / selectors and one for the reducer.) The
tests are numbered according to the recommended order of implementation:

Redux tests (i.e., files in the __src/store__ directory):

1. `src/__tests__/1-books-actions.test.js`
2. `src/__tests__/2-books-reducer.test.js`
3. `src/__tests__/3-bookshelf-actions.test.js`
4. `src/__tests__/4-bookshelf-reducer.test.js`
5. `src/__tests__/5-ui.test.js`
6. `src/__tests__/6-store.test.js`

React Component tests (i.e., files in the __src/components__ directory):

7. `src/__tests__/7-BookIndex.test.js`
8. `src/__tests__/8-BookIndexItem.test.js`
9. `src/__tests__/9-BookForm.test.js`
10. `src/__tests__/10-App.test.js`

In truth, the tests are set up such that you can complete them in any order,
with the following exceptions:

1. The tests in __2-books-reducer.test.js__ and __4-bookshelf-reducer.test.js__
   require the constants that are tested in __1-books-action.test.js__ and
   __3-bookshelf-action.test.js__, respectively.
2. Some of the tests in __6-store.test.js__ require the implementation of the
   various reducers tested in tests 2, 4, and 5.

## Debugging tips

Jest is Facebook's de facto testing framework for React components. Here are
some tips for making debugging a little less intimidating.

1. When in watch mode, Jest will often start running its tests before you finish
   making your changes but show the by-then completed changes when displaying
   any errors. As a result, code that is correct can look like it failed. The
   takeaway: **Always re-run a failed test before you start despairing and
   trying to debug.**

2. You can run the tests for a single test file by specifying the name of the
   file after `npm test`. What's more, the filename argument will be treated as
   a regular expression, so you don't have to specify the full name. E.g., to
   run only the tests in __6-store.test.js__, from the __books__ directory,
   simply run

   ```sh
   npm test 6
   ```

  (You will have to specify a little bit more for any number that also appears
  in the full path for the test files.)

3. Examine the test files to see the expected behavior.

4. If you want to see the output from `console.log`s during the tests, remove
   the `--silent` option from the `test` script in __books/package.json__. Once
   you've made the change, exit out of any testing watch mode and run `npm test`
   again to start the new script.

## Submission

1. Delete the **node_modules** directory from your project
2. Zip your project
3. Submit the zip folder