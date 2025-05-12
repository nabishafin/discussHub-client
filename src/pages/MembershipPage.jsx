import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaLockOpen, FaHeadphonesAlt, FaPercent, FaQuestionCircle, FaUsers } from 'react-icons/fa';

const MembershipPage = () => {
    const { user, gold } = useContext(AuthContext);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setRecentPosts([
                { _id: 1, post_title: "My first post", description: "This is a sample post description", time: new Date() },
                { _id: 2, post_title: "Another post", description: "More content here", time: new Date() }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <section className='bg-black text-white py-10'>
            <motion.div
                className="container mx-auto p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white p-6 rounded-[5px] shadow-lg text-black">
                    {/* Profile Section */}
                    <motion.div className="flex items-center space-x-6 mb-8" whileHover={{ scale: 1.02 }}>
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/80'}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full border-2 border-red-500"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{user?.displayName || 'User'}</h2>
                            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                        </div>
                    </motion.div>

                    {/* Membership Status */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Membership Status</h3>
                        <div className="flex space-x-4">
                            <motion.div
                                className={`px-6 py-3 rounded-[3px] ${gold ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-red-600'} text-white font-bold flex items-center space-x-2`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {gold ? <FaStar /> : <FaLockOpen />}
                                <span>{gold ? '🌟 Gold Member' : '🥉 Bronze Member'}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Membership Benefits */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Membership Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">🥉 Bronze Member</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Access to basic content</li>
                                    <li>Limited posts per day</li>
                                    <li>Standard support</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-2">🌟 Gold Member</h4>
                                <ul className="list-disc list-inside text-yellow-600">
                                    <li><FaLockOpen className="inline-block mr-2" /> Unlimited access to all content</li>
                                    <li><FaStar className="inline-block mr-2" /> Priority support</li>
                                    <li><FaHeadphonesAlt className="inline-block mr-2" /> Exclusive forum access</li>
                                    <li><FaPercent className="inline-block mr-2" /> Special discounts on events</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Why Upgrade */}
                    {!gold && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Why Upgrade to Gold?</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Unlock all premium content.</li>
                                <li>Get faster and dedicated support.</li>
                                <li>Participate in exclusive member forums.</li>
                                <li>Enjoy special offers and discounts.</li>
                            </ul>
                        </div>
                    )}

                    {/* Recent Activity */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gray-800 p-4 rounded-lg h-24"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        ) : recentPosts.length > 0 ? (
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <motion.div
                                        key={post._id}
                                        className="bg-black p-4 rounded-lg hover:bg-gray-700 transition-colors"
                                        whileHover={{ y: -3 }}
                                    >
                                        <h4 className="text-lg font-semibold text-white">{post.post_title}</h4>
                                        <p className="text-gray-300 mt-1">{post.description}</p>
                                        <div className="mt-3 text-sm text-red-400">
                                            Posted: {new Date(post.time).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-700">No recent activity found</p>
                        )}
                    </div>

                    {/* Upgrade Button */}
                    {!gold && (
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link to='/dashboard/payment'>
                                <motion.button
                                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/30 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Upgrade to Gold Membership
                                </motion.button>
                            </Link>
                            <p className="text-gray-600 mt-3">Unlock exclusive features and benefits</p>
                        </motion.div>
                    )}

                    {/* FAQ Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-semibold">What are the benefits of Gold Membership?</h5>
                                <p className="text-gray-700">Gold members get unlimited access, priority support, and exclusive forum access.</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-semibold">How do I upgrade to Gold?</h5>
                                <p className="text-gray-700">Click the 'Upgrade to Gold Membership' button to proceed with the payment.</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 text-center text-gray-700">
                        <p>For any queries, please contact us at <a href="mailto:support@example.com" className="text-red-500">support@example.com</a></p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default MembershipPage;
