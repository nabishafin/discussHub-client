import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/provider/AuthProvider';

const BannerSection = () => {
    const { setSearchTerm, searchTerm } = useContext(AuthContext);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        // You can trigger any other action here if needed (e.g., refetching data)
    };

    return (
        <div className="bg-gradient-to-r from-black via-[#0f4f4f] to-black text-white p-8 h-[500px] flex justify-center items-center">
            <div className="w-full max-w-xl">
                {/* Search Bar */}
                <form className="flex items-center space-x-2" onSubmit={handleSearchSubmit}>
                    <motion.input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search posts by tags..."
                        className="input input-bordered w-full rounded-l-md focus:ring-2 focus:ring-blue-500 bg-[#1c2531] text-white"
                        whileFocus={{
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        aria-label="Search posts"
                    />
                </form>
            </div>
        </div>
    );
};

export default BannerSection;
