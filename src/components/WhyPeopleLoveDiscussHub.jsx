import React from 'react';
import banner1 from '../assets/disscuss-1.jpg';
import banner2 from '../assets/disscuss-2.jpg';
import banner3 from '../assets/disscuus-3.jpg';
import Button from '@/shared/Button';

const WhyPeopleLoveDiscussHub = () => {
    return (
        <div className="bg-black text-white py-16 ">
            <div className="w-full md:w-10/12 px-4 mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Professional Image Grid - 3 Images Standard */}
                <div className="w-full md:w-1/2">
                    <div className="grid grid-cols-2 gap-4 relative">
                        {/* Main Image (larger) */}
                        <div className="col-span-2 h-64 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={banner1}
                                alt="Group discussion"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Secondary Images (smaller) */}
                        <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={banner2}
                                alt="Team meeting"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={banner3}
                                alt="Online discussion"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 space-y-4">
                    <span className="inline-block text-red-600 text-sm font-medium tracking-wider">
                        WELCOME TO DISCUSSHUB
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        Your Space to Discuss, Like, Share & Grow
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                        At DiscussHub, join thousands of minds sharing insights, asking questions,
                        and building knowledge together in a professional environment.
                    </p>

                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            Post your ideas and stories
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            Like and upvote valuable contributions
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            Comment to engage and collaborate
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            Share discussions on social media
                        </li>
                    </ul>

                    <Button text={'Explore Discussions'} />
                </div>
            </div>
        </div>
    );
};

export default WhyPeopleLoveDiscussHub;