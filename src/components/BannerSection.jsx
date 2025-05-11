import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/provider/AuthProvider';
import bannerImage from '../assets/banner.jpg';

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
            <div className="bg-black w-full md:w-10/12 mx-auto text-white py-16 px-4 flex flex-col md:flex-row items-center justify-between min-h-[600px]">

                {/* Left Content */}
                <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-600 via-red-400 to-red-600 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to DiscussHub
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
                        className="text-base text-gray-400 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Join trending discussions or search by tags to find topics that matter to you.
                    </motion.p>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-col sm:flex-row items-center gap-3"
                    >
                        <motion.input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search topics, tags or keywords..."
                            className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                            whileFocus={{ scale: 1.02 }}
                            aria-label="Search discussions"
                        />
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Right Image (Static, Larger, No Animation) */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img
                        src="https://via.placeholder.com/500x500?text=Join+The+Conversation" // Update with your own hosted image URL if needed
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
