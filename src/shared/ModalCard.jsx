import React from 'react';
import { FiHeart, FiThumbsUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const ModalCard = ({ setSelectedAnnouncement, selectedAnnouncement }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-200 dark:border-gray-700 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button
                    onClick={() => setSelectedAnnouncement(null)}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <FiX size={24} />
                </button>

                <div className="flex items-start mb-6">
                    <img
                        src={selectedAnnouncement.authorImage}
                        alt={selectedAnnouncement.authorName}
                        className="w-12 h-12 rounded-full border-2 border-red-600 mr-4"
                    />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {selectedAnnouncement.title}
                        </h3>
                        <p className="text-red-600 dark:text-red-400">
                            {selectedAnnouncement.authorName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(selectedAnnouncement.date).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {selectedAnnouncement.description}
                    </p>
                </div>

                {selectedAnnouncement.image && (
                    <img
                        src={selectedAnnouncement.image}
                        alt="Announcement visual"
                        className="mt-4 rounded-lg w-full max-h-64 object-cover"
                    />
                )}

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-4">
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                            <FiThumbsUp className="mr-2" /> Like
                        </button>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                            <FiHeart className="mr-2" /> Save
                        </button>
                    </div>
                    <button
                        onClick={() => setSelectedAnnouncement(null)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ModalCard;