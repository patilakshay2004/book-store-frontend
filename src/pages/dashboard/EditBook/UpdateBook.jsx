import React, { useEffect, useState } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import { FiUpload } from 'react-icons/fi';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageFileName, setImageFileName] = useState(bookData?.coverImage || '');

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setImageFileName(bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || imageFileName,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update book:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update book. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center mt-10">Error fetching book data</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

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
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('trending')}
            className="h-5 w-5 text-blue-600 rounded focus:ring focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700 font-semibold">Trending</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            register={register}
          />
          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Cover Image URL</label>
          <div className="flex items-center border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50 transition">
            <FiUpload className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter cover image URL"
              {...register('coverImage')}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          {imageFileName && <p className="mt-2 text-sm text-gray-500">Current: {imageFileName}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;