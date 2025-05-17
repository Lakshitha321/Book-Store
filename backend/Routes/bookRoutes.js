import { addNewBook,getAllBooks, getBookById } from "../Controllers/bookController.js";

const routes = (app) => {
  app.route("/books").get(getAllBooks).post(addNewBook);

  // app.route("/books/:id").get(getBookById);
}

export default routes;