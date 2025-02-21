import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/provider/AuthProvider';

const BannerSection = () => {
    const { setSearchTerm, searchTerm } = useContext(AuthContext);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400'; // Fallback image
    };

    return (
        <div className="bg-gradient-to-r from-black via-[#0f4f4f] to-black text-white p-8 h-auto md:h-[500px] flex flex-col md:flex-row items-center justify-between">
            {/* Content Section */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Discover. Explore. Create.
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Find the best content tailored just for you. Search by tags and dive into a world of creativity.
                </motion.p>

                {/* Search Bar */}
                <form className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2" onSubmit={handleSearchSubmit}>
                    <motion.input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search posts by tags..."
                        className="input input-bordered w-full md:w-auto rounded-lg focus:ring-2 focus:ring-blue-500 bg-[#2c3e50] text-white border-gray-600 placeholder-gray-400"
                        whileFocus={{
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                        aria-label="Search posts"
                    />
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                <motion.img
                    src="https://i.ibb.co.com/qYxYZ6wk/disscuss.jpg"
                    alt="Banner Image"
                    className="rounded-xl shadow-2xl w-full max-w-md responsive-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }} // Up and down animation
                    transition={{
                        duration: 2, // Duration of one cycle
                        repeat: Infinity, // Repeat infinitely
                        ease: "easeInOut", // Smooth easing
                    }}
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default BannerSection;