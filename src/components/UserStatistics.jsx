import React from 'react';
import { motion } from 'framer-motion';

const UserStatistics = () => {
    // Static data for user statistics
    const statistics = [
        {
            id: 1,
            title: 'Total Users',
            value: '1,234',
            icon: '👥', // You can replace this with an icon library like FontAwesome or React Icons
        },
        {
            id: 2,
            title: 'Total Posts',
            value: '5,678',
            icon: '📝',
        },
        {
            id: 3,
            title: 'Total Comments',
            value: '12,345',
            icon: '💬',
        },
        {
            id: 4,
            title: 'Active Today',
            value: '456',
            icon: '🔥',
        },
    ];

    return (
        <motion.div
            className="user-statistics-section bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forum Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((stat) => (
                    <motion.div
                        key={stat.id}
                        className="stat-card bg-gray-50 p-6 rounded-lg shadow-md text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <div className="text-4xl mb-4">{stat.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default UserStatistics;