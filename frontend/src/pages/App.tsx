import React, { useEffect, useState } from "react";
import axios from "axios";
import { type BookI } from "../types/book";
import BooksList from "../components/BooksList";
import BookDetails from "../components/BookDetails";
import BookForm from "../components/BookForm";
import Modal from "../components/Modal";

const API_BASE_URL = "http://localhost:4000";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookI[]>([]);
  const [currentBook, setCurrentBook] = useState<BookI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<BookI | null>(null);

  // Fetch all books
  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchBooks();
  }, []);

  // Add a new book
  const handleAddBook = async (bookData: Omit<BookI, '_id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/books`, bookData);
      setBooks(prevBooks => [...prevBooks, response.data]);
      closeModal();
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Failed to add book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing book
  const handleUpdateBook = async (bookData: Omit<BookI, '_id' | 'createdAt'>) => {
    if (!editingBook) return;
    
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/books/${editingBook._id}`, bookData);
      setBooks(prevBooks => 
        prevBooks.map(book => book._id === editingBook._id ? response.data : book)
      );
      setCurrentBook(response.data);
      closeModal();
    } catch (err) {
      console.error("Error updating book:", err);
      setError("Failed to update book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a book
  const handleDeleteBook = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      if (currentBook && currentBook._id === id) {
        setCurrentBook(null);
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (bookData: Omit<BookI, '_id' | 'createdAt'>) => {
    if (editingBook) {
      handleUpdateBook(bookData);
    } else {
      handleAddBook(bookData);
    }
  };

  const closeModal = () => {
    setEditingBook(null);
    setShowModal(false);
  };

  const handleEditBook = (book: BookI) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleAddNewBook = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  // Filtered books based on search query
  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-primary-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <h1 className="ml-3 text-xl font-semibold">Book Store Manager</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="ml-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleAddNewBook}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Book
          </button>
        </div>

        {isLoading && !books.length ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Book List</h2>
              {books.length === 0 ? (
                <div className="bg-white shadow-card rounded-lg p-6 text-center">
                  <p className="text-gray-600">No books found. Add your first book!</p>
                </div>
              ) : (
                <BooksList 
                  books={filteredBooks}
                  handleSetCurrentBook={setCurrentBook} 
                  searchQuery={searchQuery}
                />
              )}
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Book Details</h2>
              <BookDetails 
                book={currentBook} 
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modal for adding/editing books */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingBook ? "Edit Book" : "Add New Book"}
      >
        <BookForm 
          book={editingBook}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Book Store Manager &copy; {new Date().getFullYear()} - Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;