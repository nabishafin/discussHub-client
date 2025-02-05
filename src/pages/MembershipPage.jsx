import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MembershipPage = () => {
    const { user, gold } = useContext(AuthContext);
    const [recentPosts, setRecentPosts] = useState([]);
    const [badge, setBadge] = useState('Bronze');



    // Fetch recent posts and badge info




    return (
        <div className="container mx-auto p-5">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center space-x-6">
                    <img src={user?.photoURL} alt="User Avatar" className="w-20 h-20 rounded-full border border-gray-300" />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{user?.displayName}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">Badges</h3>
                    <div className="flex mt-3 space-x-4">
                        {
                            gold ? <p className='bg-yellow-500 text-white p-2'>Gold Badge</p> : <p className='bg-gray-500 text-white p-2'>Bronze</p>
                        }
                        {/* <div className={`badge ${badge === 'Bronze' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'} px-4 py-2 rounded-md`}>
                            {badge === 'Bronze' ? 'Bronze Badge' : 'Gold Badge'}
                        </div> */}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">Recent Posts</h3>
                    <div className="space-y-4 mt-3">
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <div key={post._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-800">{post.post_title}</h4>
                                    <p className="text-sm text-gray-600">{post.description}</p>
                                    <div className="mt-2 text-gray-500">
                                        <span>Posted on: {new Date(post.time).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">You have no posts yet.</p>
                        )}
                    </div>
                </div>

                {badge !== 'Gold' && (
                    <div className="mt-6 text-center">
                        <Link to='/dashboard/payment'>
                            <button
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Become a Member (Pay N Taka)
                            </button>
                        </Link>

                    </div>
                )}
            </div>
        </div >
    );
};

export default MembershipPage;
