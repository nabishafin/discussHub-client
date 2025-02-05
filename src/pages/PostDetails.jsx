import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon } from 'react-share';

const PostDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const [comment, setComment] = useState(''); // To manage new comment input

    const { data: post, refetch } = useQuery({
        queryKey: ['post', id],  // Include 'id' in the query key to fetch post by id
        queryFn: async () => {
            const res = await axiosPublic.get(`/detailspost/${id}`);
            return res.data;
        },
    });

    // Handle Upvote
    const handleUpvote = async () => {
        try {
            await axiosPublic.post(`/upvote/${id}`);  // API call to upvote
            refetch();  // Refetch the post to get updated vote counts
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    // Handle Downvote
    const handleDownvote = async () => {
        try {
            await axiosPublic.post(`/downvote/${id}`);  // API call to downvote
            refetch();  // Refetch the post to get updated vote counts
        } catch (error) {
            console.error('Error downvoting:', error);
        }
    };

    // Handle Comment Input Change
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Handle Add Comment
    const handleAddComment = async () => {
        if (comment.trim() !== '') {
            try {
                await axiosPublic.post(`/comment/${id}`, { comment });  // Send comment to the backend
                setComment('');  // Clear the comment input field
                refetch();  // Refetch the post to get updated comments
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const shareUrl = `https://example.com/post/${id}`;  // Your dynamic URL for sharing

    return (
        <div className="my-20">
            <motion.div
                className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Author Info */}
                <div className="flex items-center space-x-4">
                    <img
                        src={post?.author_img}
                        alt="Author"
                        className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{post?.author}</h2>
                        <p className="text-sm text-gray-500">
                            {new Date(post?.time).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Post Title */}
                <motion.h1
                    className="mt-4 text-2xl font-bold text-indigo-700"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {post?.post_title}
                </motion.h1>

                {/* Post Description */}
                <motion.p
                    className="mt-2 text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {post?.description || "No description available."}
                </motion.p>

                {/* Tags */}
                <div className="mt-2 flex space-x-2">
                    {Array.isArray(post?.tags) ? (
                        post?.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                            </span>
                        ))
                    ) : (
                        post?.tags?.split(',').map((tag, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                            </span>
                        ))
                    )}
                </div>

                {/* Actions: Comments, Votes, and Share */}
                <motion.div
                    className="mt-4 flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <button className="flex items-center text-gray-600">
                        <span className="text-sm">{post?.comments_count + post?.comments?.length} Comments</span>
                    </button>

                    {/* Vote Buttons */}
                    <div className="flex space-x-4 items-center">
                        <button className="flex items-center text-green-600" onClick={handleUpvote}>
                            <span className="text-lg">👍</span> <span>{post?.upvote_count}</span>
                        </button>
                        <button className="flex items-center text-red-600" onClick={handleDownvote}>
                            <span className="text-lg">👎</span> <span>{post?.downvote_count}</span>
                        </button>
                    </div>

                    {/* Share Button */}
                    <div className="flex space-x-4">
                        <FacebookShareButton url={shareUrl} quote={post?.post_title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <WhatsappShareButton url={shareUrl} title={post?.post_title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </motion.div>

                {/* Comment Section */}
                <div className="mt-6">
                    <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button
                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddComment}
                    >
                        Comment
                    </button>

                    <div className="mt-4">
                        <h3 className="font-semibold">Comments:</h3>
                        <ul className="space-y-2 mt-2">
                            {post?.comments?.map((comment, index) => (
                                <li key={index} className="p-2 border rounded-md">{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PostDetails;
