import React from 'react';
import BannerSection from '../components/BannerSection';
import MainContainer from '../components/MainContainer';
import Announcement from '@/components/Announcement';
import TopContributors from '@/components/TopContributors';
import UserStatistics from '@/components/UserStatistics';
import FAQ from '@/components/FAQ';
import WhyPeopleLoveDiscussHub from '@/components/WhyPeopleLoveDiscussHub';


const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <MainContainer></MainContainer>
            <WhyPeopleLoveDiscussHub />
            <TopContributors></TopContributors>
            <Announcement></Announcement>
            <UserStatistics></UserStatistics>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;