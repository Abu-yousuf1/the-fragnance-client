import React from 'react';
import Footer from '../../Sheard/Footer/Footer';
import Navigation from '../../Sheard/Navigation/Navigation';
import Banner from '../Banner/Banner';
import PerfumeVariants from '../perfumeVariants/PerfumeVariants';
import Services from '../Services/Services';
import Review from './../Review/Review';

const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner />
            <PerfumeVariants />
            <Services />
            <Review />
            <Footer />
        </div>
    );
};

export default Home;