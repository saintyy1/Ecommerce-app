import React from "react"
import { FaShoppingCart, FaEye } from "react-icons/fa"
import PropTypes from 'prop-types'

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onQuickView}
            className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
          >
            <FaEye />
            <span>Quick View</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">{product.category}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          <button
            onClick={onAddToCart}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <FaShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onQuickView: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
}

export default ProductCard
