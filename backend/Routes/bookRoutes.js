import { addNewBook,getAllBooks, getBookById, updateBook, deleteBook } from "../Controllers/bookController.js";

const routes = (app) => {
  app.route("/books").get(getAllBooks).post(addNewBook);

  app.route("/books/:id").get(getBookById);

  app.route("/books/:id").put(updateBook);
  app.route("/books/:id").delete(deleteBook);
}

export default routes;