import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-4 bg-gray-50">
            <div className="text-center max-w-lg mx-auto">
                <FaExclamationTriangle className="w-24 h-24 text-indigo-500 mx-auto mb-5" />
                
                <h1 className="text-8xl font-extrabold text-indigo-600 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>
                    <Link 
                        to="/products" 
                        className="flex items-center justify-center gap-2 bg-white text-indigo-500 border-2 border-indigo-500 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <FaShoppingBag />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;