import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { FaQuoteLeft } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddReview from "../components/AddReview";

const Testimonials = ({ limit }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, "testimonials");
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <FaQuoteLeft className="mx-auto text-4xl text-indigo-500 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900 block sm:text-4xl">
            {limit ? "What Our Customers Say" : "All Customer Reviews"}
          </h2>
          <p className="mt-4 mb-4 max-w-2xl mx-auto text-gray-500">
            {limit
              ? "Here’s what some of our customers have to say."
              : "Read what our valued customers have to say about their experience with us."}
          </p>
        </div>

        {limit === 3 && (
          <div className="flex flex-col [@media(min-width:380px)]:flex-row justify-between items-center px-4 sm:px-0 mb-8 gap-2">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>All Categories</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 
                     transition-colors duration-200 flex items-center gap-2"
            >
              Write a Review
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : displayedTestimonials.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedTestimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-xl text-gray-500">
            No testimonials available at the moment.
          </p>
        )}

        {limit && testimonials.length > limit && (
          <div className="text-center mt-8">
            <a
              href="/testimonials"
              className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              View All Testimonials
            </a>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-xl w-full mx-4 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <AddReview onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
