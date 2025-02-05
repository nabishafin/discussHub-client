
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };
    return (
        <div>
            <div>
                <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
                        <p className="mt-4 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
                        <button
                            onClick={goHome}
                            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
