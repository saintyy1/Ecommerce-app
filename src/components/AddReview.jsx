import React, { useState } from "react";
import { FaPaperPlane, FaUser, FaSpinner } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase configuration

const AddReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const newReview = {
      ...formData,
      date: new Date().toISOString(), // Add a timestamp for when the review was submitted
    };

    try {
      // Add the new review to the "testimonials" collection in Firestore
      await addDoc(collection(db, "testimonials"), newReview);
      setMessage({
        type: "success",
        text: "Thank you for your review! It has been submitted successfully.",
      });
      // Reset the form
      setFormData({ name: "", feedback: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage({
        type: "error",
        text: "An error occurred while submitting your review. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Leave a Review</h3>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            placeholder="Share your experience..."
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center"
        >
          {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
