import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/provider/AuthProvider';
import bannerImage from '../assets/banner.jpg';
// import Typed from 'react-typed'; // Uncomment if you install 'react-typed'

const BannerSection = () => {
    const { setSearchTerm, searchTerm } = useContext(AuthContext);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const handleImageError = (e) => {
        e.target.src = `${bannerImage}`;
    };

    return (
        <section className='bg-black'>
            <div className="bg-black w-full md:w-10/12 mx-auto text-white py-16 px-4 flex flex-col md:flex-row items-center justify-between min-h-[700px]">

                {/* Left Content */}
                <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-600 via-red-400 to-red-600 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to DiscussHub
                        {/* <Typed
                            strings={['Welcome to DiscussHub', 'Join the Conversation', 'Explore Trending Topics']}
                            typeSpeed={40}
                            backSpeed={50}
                            loop
                            className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-600 via-red-400 to-red-600 text-transparent bg-clip-text"
                        /> */}
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        A community where curious minds come together. Ask questions, share opinions, and engage in meaningful conversations on technology, lifestyle, education, creativity, and more. It's your space to speak and be heard.
                    </motion.p>

                    <motion.p
                        className="text-base text-gray-400 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Join trending discussions or search by tags to find topics that matter to you.
                    </motion.p>

                    {/* Stats */}
                    <p className="text-sm text-gray-500 mb-4">
                        🎉 10,000+ active members · 💬 500+ daily posts
                    </p>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-col sm:flex-row items-center gap-3 mb-6"
                    >
                        <motion.input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search topics, tags or keywords..."
                            className="w-full sm:w-2/3 px-4 py-3 rounded-[5px] bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                            whileFocus={{ scale: 1.02 }}
                            aria-label="Search discussions"
                        />

                    </form>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 mb-6 justify-center md:justify-start">
                        <button className="bg-red-600 text-white px-6 py-2 rounded-[4px] font-semibold hover:bg-gray-200 transition">
                            Join Now
                        </button>
                        <button className="border border-red-600 px-6 py-2 rounded-[5px] text-white hover:bg-white hover:text-black transition">
                            Learn More
                        </button>
                    </div>

                    {/* Popular Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                        {['#Technology', '#Creativity', '#AI', '#Education', '#Health'].map(tag => (
                            <span key={tag} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className="italic text-gray-400 border-l-4 pl-4 border-red-500">
                        “This platform helped me connect with experts around the world.” – A community member
                    </blockquote>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img
                        src="https://via.placeholder.com/500x500?text=Join+The+Conversation"
                        alt="Discussion Illustration"
                        className="rounded-lg shadow-2xl w-full max-w-2xl object-cover"
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
