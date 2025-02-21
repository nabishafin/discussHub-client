import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/autoplay'; // Import autoplay styles

const Announcement = () => {
    const axiosPublic = useAxiosPublic();
    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        },
    });

    if (!announcements || announcements.length === 0) {
        return null;
    }

    return (
        <motion.div
            className="announcement-section bg-gradient-to-r from-black via-[#0f4f4f] to-black p-6 shadow-xl rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
        >
            {/* Notification Icon with Announcement Count */}
            <motion.div
                className="flex justify-between items-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center space-x-2">
                    <span className="text-2xl text-white font-semibold">Announcements</span>
                    <motion.span
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {announcements.length}
                    </motion.span>
                </div>
            </motion.div>

            {/* Swiper for Announcements */}
            <Swiper
                spaceBetween={30}
                slidesPerView={1} // Default for small devices
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    // When window width is >= 640px (medium devices)
                    640: {
                        slidesPerView: 2, // Show 2 slides on medium devices
                    },
                    // When window width is >= 768px (large devices)
                    768: {
                        slidesPerView: 3, // Show 3 slides on large devices
                    },
                    // When window width is >= 1024px (extra large devices)
                    1024: {
                        slidesPerView: 4, // Show 4 slides on extra large devices
                    },
                }}
                className="rounded-lg overflow-hidden"
            >
                {announcements.map((announcement, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg mb-4 h-52"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <div className="flex items-center">
                                <motion.img
                                    src={announcement.authorImage}
                                    alt={announcement.authorName}
                                    className="w-12 h-12 rounded-full mr-4"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div>
                                    <motion.p
                                        className="text-gray-800 font-semibold"
                                        whileHover={{ color: '#4F46E5' }}
                                    >
                                        {announcement.authorName}
                                    </motion.p>
                                    <motion.p
                                        className="text-gray-500 text-sm"
                                        whileHover={{ color: '#4F46E5' }}
                                    >
                                        {announcement.title}
                                    </motion.p>
                                </div>
                            </div>
                            <motion.p
                                className="text-gray-600 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {announcement.description}
                            </motion.p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

export default Announcement;