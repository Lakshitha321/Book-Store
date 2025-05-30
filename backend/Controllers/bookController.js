import Book from "../Models/bookModel.js";

export const addNewBook = async (req, res) => {
    try {
       //create book using req body
       const newBook = new Book(req.body);
       //save book to db
       const savedBook = await newBook.save();
       //send a response with the saved book
       res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({message: "Error creating book", error: err.message}); //send an eror response
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({message: "Error fetching books", error: err.message});
    }
};

export const getBookById = async (req, res) => {
      try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "Book not found"});
        }

}catch (err) {
        res.status(500).json({message: "Error fetching book", error: err.message});
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "Book not found"});
        }   
    }
    catch (err) {
        res.status(500).json({message: "Error updating book", error: err.message});
    }
}
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.status(200).json({message: "Book deleted successfully"});
        } else {
            res.status(404).json({message: "Book not found"});
        }
    } catch (err) {
        res.status(500).json({message: "Error deleting book", error: err.message});
    }
}
