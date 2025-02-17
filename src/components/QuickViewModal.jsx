import React from "react"
import { FaShoppingCart, FaTimes } from "react-icons/fa"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
 
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  if (!isOpen || !product) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-bold text-indigo-600 mb-4">${product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 uppercase mb-4">{product.category}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal

