import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-indigo-900 to-indigo-700 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 py-16 sm:py-24 lg:py-32">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Discover the Latest
                                <span className="block text-indigo-300">Fashion Trends</span>
                            </h1>
                            <p className="mt-6 text-xl text-indigo-100">
                                Explore our curated collection of stylish and comfortable clothing for every occasion. From casual wear
                                to elegant evening attire, we've got you covered.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/products"
                                    className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    <FaShoppingBag className="text-xl" />
                                    Shop Now
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-0 lg:relative">
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src="/images/hero-image.png"
                                    alt="Featured product: A model wearing the latest fashion trend"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default HeroSection;