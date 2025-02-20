import React from "react"
import { FaQuoteRight } from "react-icons/fa"

const TestimonialCard = ({ testimonial }) => {
  const formattedDate = new Date(testimonial.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="px-6 py-8 relative">
        <FaQuoteRight className="absolute top-4 right-4 text-indigo-200 text-4xl" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{testimonial.name}</h3>
        <p className="text-gray-600 italic mb-4">"{testimonial.feedback}"</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  )
}

export default TestimonialCard

