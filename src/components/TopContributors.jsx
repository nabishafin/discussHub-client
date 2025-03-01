import React from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopContributors = () => {
    // Static data for top contributors
    const contributors = [
        {
            id: 1,
            name: 'John Doe',
            posts: 120,
            comments: 300,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Jane Smith',
            posts: 95,
            comments: 250,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            posts: 80,
            comments: 200,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            name: 'Bob Brown',
            posts: 75,
            comments: 180,
            profileImage: 'https://via.placeholder.com/150',
        },
    ];

    // Prepare data for the bar chart
    const chartData = {
        labels: contributors.map((c) => c.name),
        datasets: [
            {
                label: 'Posts',
                data: contributors.map((c) => c.posts),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
            },
            {
                label: 'Comments',
                data: contributors.map((c) => c.comments),
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top Contributors Activity',
            },
        },
    };

    return (
        <motion.div
            className="top-contributors-section bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">Top Contributors</h2>
            <div className="flex justify-center items-center h-96">
                <div className="w-full max-w-3xl">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </motion.div>
    );
};

export default TopContributors;