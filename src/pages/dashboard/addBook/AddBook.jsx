import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import { FiUpload } from 'react-icons/fi';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data) => {
    const newBookData = { ...data, coverImage: imageFileName };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book Added",
        text: "Your book has been uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      reset();
      setImageFile(null);
      setImageFileName('');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          error={errors.title}
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          error={errors.description}
        />

        {/* Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Select a Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
          error={errors.category}
        />

        {/* Trending */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('trending')}
            className="h-5 w-5 text-blue-600 rounded focus:ring focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700 font-semibold">Trending</label>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            register={register}
            error={errors.oldPrice}
          />
          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
            error={errors.newPrice}
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
          <div className="flex items-center border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50 transition">
            <FiUpload className="text-gray-500 mr-2" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full cursor-pointer" />
          </div>
          {imageFileName && <p className="mt-2 text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-bold rounded-lg transition ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;