import useAxiosSecure from '@/hooks/UseAxiosSecure';
import { AuthContext } from '@/provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetching stats data using react-query
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats');
            return res.data;  // Return the stats data from the response
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10 bg-gray-50">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg text-center">
                    <p className="text-xl text-gray-600">Loading statistics...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center py-10 bg-gray-50">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg text-center">
                    <p className="text-xl text-red-600">Failed to fetch statistics: {error.message}</p>
                </div>
            </div>
        );
    }

    // Pie chart data
    const chartData = {
        labels: ['Posts', 'Comments', 'Users'],
        datasets: [
            {
                data: [data.totalPosts, data.totalComments, data.totalUsers],
                backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
                hoverBackgroundColor: ['#357ABD', '#28B486', '#F09F23'],
            },
        ],
    };

    return (
        <div>
            <div className="flex justify-center py-10 bg-gray-50">
                <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
                    <div className="flex items-center mb-8">
                        <img
                            src={user.photoURL}
                            alt="Admin Avatar"
                            className="w-32 h-32 rounded-full mr-6 border-4 border-blue-500"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800">{user.displayName}</h2>
                            <p className="text-lg text-gray-600">Admin</p>
                            <a href={`mailto:${user.email}`} className="text-blue-500 mt-2 block">
                                {user.email}
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Number of Posts</h3>
                            <p className="text-3xl font-bold text-blue-600">{data.totalPosts}</p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Number of Comments</h3>
                            <p className="text-3xl font-bold text-blue-600">{data.totalComments}</p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Number of Users</h3>
                            <p className="text-3xl font-bold text-blue-600">{data.totalUsers}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Site Statistics Overview</h3>
                        <div className="flex justify-center w-96 h-96"> {/* Adjust the size of the Pie chart here */}
                            <Pie data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
