import React from 'react';
import ProductList from '../components/ProductList';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <ProductList />
            <Testimonials limit={3} />
        </div>
    );
};


export default Home;