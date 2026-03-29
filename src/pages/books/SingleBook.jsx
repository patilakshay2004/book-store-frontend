import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'

import { getImgUrl } from '../../utils/getImgUrl'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi'

const SingleBook = () => {

    const { id } = useParams()

    const {
        data: book,
        isLoading,
        isError
    } = useFetchBookByIdQuery(id)

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(book))
    }

    // 🔄 Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    // ❌ Error State
    if (isError || !book) {
        return (
            <div className="text-center py-20 text-red-500 text-lg">
                ❌ Book not found
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">

            <div className="grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-xl p-6">

                {/* 📘 Book Image */}
                <div className="flex justify-center">
                    <img
                        src={getImgUrl(book?.coverImage)}
                        alt={book?.title}
                        className="w-72 h-96 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                    />
                </div>

                {/* 📖 Book Details */}
                <div className="flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            {book?.title}
                        </h1>

                        <p className="text-gray-600 mb-2">
                            <strong>Author:</strong> {book?.author || "Admin"}
                        </p>

                        <p className="text-gray-600 mb-2 capitalize">
                            <strong>Category:</strong> {book?.category}
                        </p>

                        <p className="text-gray-600 mb-4">
                            <strong>Published:</strong>{" "}
                            {new Date(book?.createdAt).toLocaleDateString()}
                        </p>

                        {/* 💰 Price */}
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-blue-600">
                                ${book?.newPrice}
                            </span>
                            <span className="ml-3 line-through text-gray-400">
                                ${book?.oldPrice}
                            </span>
                        </div>

                        {/* 📄 Description */}
                        <p className="text-gray-700 leading-relaxed">
                            {book?.description}
                        </p>
                    </div>

                    {/* 🛒 Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
                    >
                        <FiShoppingCart />
                        Add to Cart
                    </button>

                </div>

            </div>
        </div>
    )
}

export default SingleBook