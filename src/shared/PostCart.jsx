import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {


    return (
        <motion.div
            className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
            {/* Wrap the card content with a Link component */}
            <Link to={`/postdetails/${post._id}`} className="flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                    {/* Post Title */}
                    <motion.h2
                        className="text-2xl font-semibold text-gray-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {post.post_title}
                    </motion.h2>

                    {/* Author and Time */}
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                        <img
                            src={post.author_img} // Author Image
                            alt="Author"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="mr-2">{post.author}</span>
                        <span>•</span>
                        <span className="ml-2">{new Date(post.time).toLocaleString()}</span>
                    </div>

                    {/* Tags */}
                    <div className="mt-2">
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-gray-200 rounded-full">
                            {post.tags}
                        </span>
                    </div>

                    {/* Stats */}
                    <motion.div
                        className="mt-4 flex justify-between items-center text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <div>
                            <span className="font-semibold">{post.comments_count}</span> Comments
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-green-600">{post.upvote_count}</span> Upvotes
                            <span className="text-xs text-gray-400">({post.votes_count} total votes)</span>
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.div>

    );
};

export default PostCard;
