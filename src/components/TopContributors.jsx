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
            name: 'Arman Hossain',
            posts: 120,
            comments: 300,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Fatema Khatun',
            posts: 95,
            comments: 250,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Nayeem Rahman',
            posts: 80,
            comments: 200,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            name: 'Rumi Akter',
            posts: 75,
            comments: 180,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 5,
            name: 'Tanjil Ahmed',
            posts: 60,
            comments: 150,
            profileImage: 'https://via.placeholder.com/150',
        },
        {
            id: 6,
            name: 'Sadia Noor',
            posts: 50,
            comments: 130,
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
                backgroundColor: 'rgba(220, 38, 38, 1)', // solid red
            },
            {
                label: 'Comments',
                data: contributors.map((c) => c.comments),
                backgroundColor: 'rgba(0, 0, 0, 1)', // solid black
            },
        ],
    };

    // Chart options with responsiveness
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
            <div className="flex justify-center items-center w-full md:w-8/12 px-2 mx-auto sm:px-4 md:px-6">
                <div className="w-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </motion.div>
    );
};

export default TopContributors;
