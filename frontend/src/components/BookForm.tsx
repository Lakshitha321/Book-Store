import React, { useState, useEffect } from 'react';
import { type BookI } from '../types/book';

interface BookFormProps {
  book?: BookI | null;
  onSubmit: (bookData: Omit<BookI, '_id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  publishedYear: new Date().getFullYear(),
  isAvailable: true,
};

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<BookI, '_id' | 'createdAt'>>(emptyBook);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If editing an existing book, populate the form data
  useEffect(() => {
    if (book) {
      const { _id, createdAt, ...bookData } = book;
      setFormData(bookData);
    } else {
      setFormData(emptyBook);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'publishedYear' 
          ? parseInt(value) || '' 
          : value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (formData.publishedYear) {
      const year = Number(formData.publishedYear);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(year) || year < 1000 || year > currentYear + 5) {
        newErrors.publishedYear = `Year must be between 1000 and ${currentYear + 5}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white shadow-card rounded-lg p-6">
      <h2 className="text-xl font-semibold text-primary-800 mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
                ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div className="col-span-2">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author*
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
                ${errors.author ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}`}
            />
            {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
              Published Year
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear || ''}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
                ${errors.publishedYear ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}`}
            />
            {errors.publishedYear && <p className="mt-1 text-sm text-red-600">{errors.publishedYear}</p>}
          </div>

          <div className="col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAvailable"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                Available for checkout
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {book ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;