import useAxiosSecure from '@/hooks/UseAxiosSecure';
import { AuthContext } from '@/provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats');
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10 bg-white">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg text-center">
                    <p className="text-xl text-black">Loading statistics...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center py-10 bg-white">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg text-center">
                    <p className="text-xl text-red-600">Failed to fetch statistics: {error.message}</p>
                </div>
            </div>
        );
    }

    // Pie chart data (Red & Black theme)
    const chartData = {
        labels: ['Posts', 'Comments', 'Users'],
        datasets: [
            {
                data: [data.totalPosts, data.totalComments, data.totalUsers],
                backgroundColor: ['#DC2626', '#7F1D1D', '#000000'], // red-600, dark red, black
                hoverBackgroundColor: ['#B91C1C', '#991B1B', '#1F2937'],
            },
        ],
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="flex justify-center py-10">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
                    {/* Profile Info */}
                    <div className="flex items-center mb-8">
                        <img
                            src={user.photoURL}
                            alt="Admin Avatar"
                            className="w-32 h-32 rounded-full mr-6 border-4 border-red-600"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold text-black">{user.displayName}</h2>
                            <p className="text-lg text-red-600">Admin</p>
                            <a href={`mailto:${user.email}`} className="text-red-600 mt-2 block">
                                {user.email}
                            </a>
                        </div>
                    </div>

                    {/* Stats Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-red-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-black">Number of Posts</h3>
                            <p className="text-3xl font-bold text-red-600">{data.totalPosts}</p>
                        </div>
                        <div className="bg-red-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-black">Number of Comments</h3>
                            <p className="text-3xl font-bold text-red-600">{data.totalComments}</p>
                        </div>
                        <div className="bg-red-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-black">Number of Users</h3>
                            <p className="text-3xl font-bold text-red-600">{data.totalUsers}</p>
                        </div>
                    </div>

                    {/* Pie Chart Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-black mb-4">Site Statistics Overview</h3>
                        <div className="flex justify-center w-full md:w-96 mx-auto">
                            <Pie data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
