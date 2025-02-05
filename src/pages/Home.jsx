import React from 'react';
import BannerSection from '../components/BannerSection';
import MainContainer from '../components/MainContainer';
import Announcement from '@/components/Announcement';


const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <MainContainer></MainContainer>
            <Announcement></Announcement>

        </div>
    );
};

export default Home;