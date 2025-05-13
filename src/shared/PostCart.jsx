import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaComment, FaThumbsUp, FaEllipsisH } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
    const {
        _id,
        post_title,
        author_img,
        author,
        time,
        tags,
        comments_count,
        upvote_count,
        votes_count,
        excerpt
    } = post;

    return (
        <motion.article
            className="border border-gray-200 rounded-[4px] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col w-full bg-white"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-labelledby={`post-title-${_id}`}
        >
            <Link
                to={`/postdetails/${_id}`}
                className="flex flex-col h-full"
                aria-label={`Read more about ${post_title}`}
            >
                <div className="p-5 flex flex-col flex-grow">
                    {/* Header with title and optional menu */}
                    <div className="flex justify-between items-start mb-3">
                        <motion.h2
                            id={`post-title-${_id}`}
                            className="text-xl font-bold text-gray-800 leading-snug"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            {post_title}
                        </motion.h2>
                        <button
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle menu click
                            }}
                            aria-label="Post options"
                        >
                            <FaEllipsisH size={14} />
                        </button>
                    </div>

                    {/* Excerpt */}
                    {excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {excerpt}
                        </p>
                    )}

                    {/* Author and metadata */}
                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                        <div className="flex items-center mr-4">
                            <img
                                src={author_img || '/default-avatar.png'}
                                alt={`${author}'s profile`}
                                className="w-6 h-6 rounded-full mr-2 object-cover"
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                            <span className="font-medium text-gray-700">{author}</span>
                        </div>
                        <span className="mr-4">
                            {formatDistanceToNow(new Date(time), { addSuffix: true })}
                        </span>
                    </div>

                    {/* Tags */}
                    {tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {tags.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs font-medium text-red-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <motion.div
                        className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                                <FaComment className="text-gray-400" size={12} />
                                <span>{comments_count} comments</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaThumbsUp className="text-blue-500" size={12} />
                                <span className="font-medium text-blue-500">{upvote_count}</span>
                                <span className="text-gray-400">({votes_count})</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.article>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        post_title: PropTypes.string.isRequired,
        author_img: PropTypes.string,
        author: PropTypes.string.isRequired,
        time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        tags: PropTypes.string,
        comments_count: PropTypes.number,
        upvote_count: PropTypes.number,
        votes_count: PropTypes.number,
        excerpt: PropTypes.string
    }).isRequired
};

export default PostCard;