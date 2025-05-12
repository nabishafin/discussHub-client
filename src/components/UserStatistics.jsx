import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiFileText, FiActivity } from 'react-icons/fi';

const UserStatistics = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const statistics = [
        {
            id: 1,
            title: 'Total Users',
            value: 1234,
            icon: <FiUsers className="w-8 h-8 text-white" />,
            trend: '12% increase'
        },
        {
            id: 2,
            title: 'Total Posts',
            value: 5678,
            icon: <FiFileText className="w-8 h-8 text-white" />,
            trend: '5% increase'
        },
        {
            id: 3,
            title: 'Total Comments',
            value: 12345,
            icon: <FiMessageSquare className="w-8 h-8 text-white" />,
            trend: '8% increase'
        },
        {
            id: 4,
            title: 'Active Today',
            value: 456,
            icon: <FiActivity className="w-8 h-8 text-white" />,
            trend: '3% decrease'
        }
    ];

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    const Counter = ({ from = 0, to, duration = 2 }) => {
        const [count, setCount] = useState(from);

        useEffect(() => {
            let start = from;
            const increment = (to - from) / (duration * 60);

            const timer = setInterval(() => {
                start += increment;
                setCount(Math.floor(start));
                if (start >= to) {
                    setCount(to);
                    clearInterval(timer);
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }, [from, to, duration]);

        return count.toLocaleString();
    };

    return (
        <motion.section
            ref={ref}
            className="bg-white py-8 shadow-lg 0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="px-4 w-full md:w-10/12 mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-black mb-3">
                        Community Stats
                    </h2>
                    <p className="text-lg text-black max-w-3xl mx-auto">
                        Key metrics about our growing community
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statistics.map((stat) => (
                        <motion.div
                            key={stat.id}
                            className="bg-black p-6 rounded-[5px] border border-gray-800 "
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={controls}
                            variants={{
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ type: 'spring', stiffness: 300, duration: 0.5 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-lg">{stat.icon}</div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full text-white border border-white">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                                {stat.title}
                            </h3>
                            <p className="text-3xl font-bold text-white mb-2">
                                <Counter from={0} to={stat.value} />
                            </p>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden mt-3">
                                <div
                                    className="h-full bg-red-600"
                                    style={{ width: `${Math.min(100, Math.max(5, stat.value / 100))}%` }}
                                ></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12 bg-black p-6  border border-gray-800  rounded-[5px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Facts</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start">
                            <div className="bg-gray-900 p-3 rounded-lg mr-4">
                                <FiUsers className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Peak Hours</h4>
                                <p className="text-white">6–9 PM (GMT+6)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-gray-900 p-3 rounded-lg mr-4">
                                <FiFileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Top Category</h4>
                                <p className="text-white">Technology</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-gray-900 p-3 rounded-lg mr-4">
                                <FiMessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Avg. Engagement</h4>
                                <p className="text-white">5.2 replies per thread</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default UserStatistics;

