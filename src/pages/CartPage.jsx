import React from "react"
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { currentUser } = useAuth()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-5">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 p-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-gray-600 mt-1">${item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link to={currentUser ? '/checkout' : '/signin'} className="inline-flex justify-center items-center w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out">
                {currentUser ? 'Proceed to Checkout' : 'Login and Proceed'}
              </Link>
              <Link
                to="/products"
                className="block text-center mt-4 text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

