import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaShoppingCart, FaUser } from "react-icons/fa"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-indigo-500 fixed top-0 left-0 right-0 z-50 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="text-2xl font-bold tracking-tight" aria-label="ShopNow - Home">
              ShopNow
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-base font-medium hover:text-gray-200 transition duration-150 ease-in-out">
              Home
            </Link>
            <Link
              to="/products"
              className="text-base font-medium hover:text-gray-200 transition duration-150</nav> ease-in-out"
            >
              Products
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="/cart"
              className="whitespace-nowrap text-base font-medium hover:text-gray-200 transition duration-150 ease-in-out"
            >
              <FaShoppingCart className="inline-block mr-1" />
              Cart
            </Link>
            <Link
              to="/account"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <FaUser className="inline-block mr-1" />
              Account
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-200 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-200 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-200 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <FaShoppingCart className="inline-block mr-1" />
            Cart
          </Link>
          <Link
            to="/account"
            className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-200 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <FaUser className="inline-block mr-1" />
            Account
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header


