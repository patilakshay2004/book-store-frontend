import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageBooks = () => {
  const { data: books, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert('Book deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete book:', error.message);
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <section className="py-8 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
          <Link
            to="/dashboard/add-new-book"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            + Add Book
          </Link>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books && books.map((book, index) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${book.newPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                    <Link
                      to={`/dashboard/edit-book/${book._id}`}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!books?.length && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;