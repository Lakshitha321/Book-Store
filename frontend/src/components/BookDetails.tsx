import React from 'react';
import { type BookI } from '../types/book';

interface BookDetailsProps {
  book: BookI | null;
  onEdit: (book: BookI) => void;
  onDelete: (id: string) => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onEdit, onDelete }) => {
  if (!book) {
    return (
      <div className="p-8 bg-white shadow-card rounded-lg text-center">
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-medium text-gray-600">Select a book to see details</h2>
      </div>
    );
  }

  // Calculate average rating
  const ratings = book.ratings || [];
  const averageRating = ratings.length > 0 
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) 
    : 'No ratings';

  return (
    <div className="p-6 bg-white shadow-card rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-primary-800">{book.title}</h2>
          <p className="text-lg font-medium text-gray-700">by {book.author}</p>
        </div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${book.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {book.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Genre</p>
          <p className="font-medium">{book.genre || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Published Year</p>
          <p className="font-medium">{book.publishedYear || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Rating</p>
          <div className="flex items-center">
            {typeof averageRating === 'string' ? (
              <span>{averageRating}</span>
            ) : (
              <>
                <span className="text-yellow-500">★</span>
                <span className="ml-1 font-medium">{averageRating}/5</span>
                <span className="ml-1 text-sm text-gray-500">({ratings.length} ratings)</span>
              </>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Added On</p>
          <p className="font-medium">{new Date(book.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button 
          onClick={() => onEdit(book)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(book._id)}
          className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetails;