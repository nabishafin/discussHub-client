import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiBell, FiChevronRight, FiThumbsUp, FiHeart, FiX } from 'react-icons/fi';
import { Skeleton } from '@mui/material';
import ModalCard from '@/shared/ModalCard';

const Announcement = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        },
    });

    const filteredAnnouncements = activeCategory === 'all'
        ? announcements
        : announcements.filter(item => item.category === activeCategory);

    if (isLoading) {
        return (
            <div className="bg-black p-6 rounded-xl shadow-2xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={150} height={30} />
                        <Skeleton variant="rounded" width={40} height={20} />
                    </div>
                    <Skeleton variant="text" width={80} height={20} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" height={180} />
                    ))}
                </div>
            </div>
        );
    }

    if (!filteredAnnouncements || filteredAnnouncements.length === 0) {
        return null;
    }

    return (
        <section className='bg-black'>
            <motion.div
                className="bg-black text-white dark:bg-black px-4 md:w-10/12 w-full mx-auto py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <motion.div
                            className="p-2 bg-red-600 rounded-lg shadow-md"
                            whileHover={{ rotate: 10 }}
                        >
                            <FiBell className="text-white text-xl" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white">Latest Updates</h2>
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                            {filteredAnnouncements.length} New
                        </span>
                    </div>
                    <motion.button
                        className="flex items-center text-red-600 hover:text-red-400 text-sm font-medium"
                        whileHover={{ x: 3 }}
                    >
                        View All <FiChevronRight className="ml-1" />
                    </motion.button>
                </div>

                {/* Category Filter */}
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                    {['all', 'news', 'update', 'event'].map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1 rounded-full text-sm capitalize whitespace-nowrap ${activeCategory === category
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Swiper Container */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="!pb-10"
                >

                    {filteredAnnouncements.map((announcement, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                className="h-[300px] bg-gray-100 dark:bg-gray-800 p-5 rounded-[3px] border border-gray-200 dark:border-gray-700 flex flex-col relative"
                                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Priority Tag */}
                                {announcement.priority === 'high' && (
                                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                        Urgent
                                    </span>
                                )}

                                <div className="flex items-start mb-4">
                                    <motion.img
                                        src={announcement.authorImage}
                                        alt={announcement.authorName}
                                        className="w-10 h-10 rounded-full border-2 border-red-600 mr-3"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-gray-800 dark:text-white font-semibold">
                                                {announcement.authorName}
                                            </h3>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                                {new Date(announcement.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-red-600 dark:text-red-400 text-sm">
                                            {announcement.title}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4 line-clamp-3">
                                    {announcement.description}
                                </p>

                                {/* Reaction Buttons */}
                                <div className="flex items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 mr-3">
                                        <FiThumbsUp className="mr-1" /> {announcement.likes || 0}
                                    </button>
                                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                                        <FiHeart className="mr-1" /> {announcement.hearts || 0}
                                    </button>
                                </div>

                                <motion.button
                                    className="mt-3 self-start text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 text-sm flex items-center"
                                    whileHover={{ x: 3 }}
                                    onClick={() => setSelectedAnnouncement(announcement)}
                                >
                                    Read more <FiChevronRight className="ml-1" />
                                </motion.button>
                            </motion.div>

                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Announcement Detail Modal */}
                {selectedAnnouncement && (
                    <ModalCard
                        selectedAnnouncement={selectedAnnouncement}
                        setSelectedAnnouncement={setSelectedAnnouncement}
                    ></ModalCard>
                )}
            </motion.div>
        </section>
    );
};

export default Announcement;
