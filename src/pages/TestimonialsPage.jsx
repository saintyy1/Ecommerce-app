import React, { useState } from 'react';
import AddReview from '../components/AddReview';
import Testimonials from '../components/Testimonials';

const TestimonialsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        {/* Reviews Grid */}
        <div>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;