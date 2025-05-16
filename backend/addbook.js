import mongoose from "mongoose";
import Book from "./Models/bookModel.js";

//connect to mongoDB
mongoose
.connect("mongodb://localhost:27017/bookclubdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true, //Recommens=ded for Mongoose connections
})
.then(() => {
  console.log("Connected to MongoDB");
  addBook();
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err.message);
});

//Add a sample book
const addBook = async () => {
  try {
    const book = new Book({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      publishedYear: 1925,
    });

    const savedBook = await book.save();
    console.log("Book saved successfully:", savedBook);
  } catch (error) {
    console.error("Error saving book:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

