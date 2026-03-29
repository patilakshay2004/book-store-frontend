import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { clearCart, removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice'

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0)
    .toFixed(2)

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleQuantityChange = (e, productId) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1)
    dispatch(updateQuantity({ id: productId, quantity }))
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* 🛒 LEFT - CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🛒 Shopping Cart</h2>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-6">

              {cartItems.map((product) => (
                <div
                  key={product._id}
                  className="flex gap-4 border-b pb-4 items-center"
                >

                  {/* Image */}
                  <img
                    src={getImgUrl(product?.coverImage)}
                    alt={product?.title}
                    className="w-20 h-24 object-cover rounded-md"
                  />

                  {/* Info */}
                  <div className="flex flex-col flex-grow">

                    <Link to="/">
                      <h3 className="font-semibold hover:text-blue-600 line-clamp-1">
                        {product?.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-500">
                      Category: {product?.category}
                    </p>

                    <p className="text-blue-600 font-semibold mt-1">
                      ₹{product?.newPrice}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">

                      <input
                        type="number"
                        min="1"
                        value={product.quantity || 1}
                        onChange={(e) => handleQuantityChange(e, product._id)}
                        className="w-16 border rounded px-2 py-1 text-sm"
                      />

                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-center text-gray-400">Your cart is empty 😔</p>
          )}
        </div>

        {/* 💳 RIGHT - SUMMARY */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">

          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Shipping & taxes calculated at checkout
          </p>

          <Link
            to={cartItems.length === 0 ? "#" : "/checkout"}
            className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block text-center mt-4 text-blue-600 text-sm hover:underline"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  )
}

export default CartPage