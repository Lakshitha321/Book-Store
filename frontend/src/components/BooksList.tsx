import React, { useState } from 'react';
import { type BookI } from '../types/book';

interface BooksListProps {
  books: BookI[];
  handleSetCurrentBook: (book: BookI) => void;
  searchQuery: string;
}

const BooksList: React.FC<BooksListProps> = ({ books, handleSetCurrentBook, searchQuery }) => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.genre && book.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookClick = (book: BookI) => {
    setSelectedBookId(book._id);
    handleSetCurrentBook(book);
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="bg-white shadow-card rounded-lg p-6 text-center">
        <p className="text-gray-600">No books found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-card rounded-lg">
      <ul className="divide-y divide-gray-200">
        {filteredBooks.map((book) => (
          <li
            key={book._id}
            onClick={() => handleBookClick(book)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedBookId === book._id ? 'bg-primary-50 border-l-4 border-primary-600' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-primary-800">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                {book.genre && <p className="text-xs text-gray-500 mt-1">{book.genre}</p>}
              </div>
              <div>
                <span className={`inline-block w-3 h-3 rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;