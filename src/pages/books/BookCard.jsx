import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({ book }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(book))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-3 flex flex-col h-full">

      {/* 📖 Image */}
      <Link to={`/books/${book._id}`} className="block">
        <img
          src={getImgUrl(book?.coverImage)}
          alt={book?.title}
          className="w-full h-44 object-cover rounded-md mb-3 hover:scale-105 transition"
        />
      </Link>

      {/* 📚 Content */}
      <div className="flex flex-col flex-grow">

        {/* Title */}
        <Link to={`/books/${book._id}`}>
          <h3 className="text-md font-semibold mb-1 hover:text-blue-600 line-clamp-1">
            {book?.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {book?.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="text-blue-600 font-bold text-lg">
            ₹{book?.newPrice}
          </span>
          {book?.oldPrice && (
            <span className="line-through text-gray-400 ml-2 text-sm">
              ₹{book?.oldPrice}
            </span>
          )}
        </div>

        {/* Button (Always Bottom) */}
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>
    </div>
  )
}

export default BookCard