import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import {
    FacebookShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
} from 'react-share';
import { FaRegCommentDots } from 'react-icons/fa';

const PostDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [comment, setComment] = useState('');

    const { data: post, refetch } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/detailspost/${id}`);
            return res.data;
        },
    });

    const handleUpvote = async () => {
        try {
            await axiosPublic.post(`/upvote/${id}`);
            refetch();
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    const handleDownvote = async () => {
        try {
            await axiosPublic.post(`/downvote/${id}`);
            refetch();
        } catch (error) {
            console.error('Error downvoting:', error);
        }
    };

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleAddComment = async () => {
        if (comment.trim() !== '') {
            try {
                await axiosPublic.post(`/comment/${id}`, { comment });
                setComment('');
                refetch();
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const shareUrl = `https://example.com/post/${id}`;

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <motion.div
                className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Author Section */}
                <div className="flex items-center space-x-4">
                    <img
                        src={post?.author_img}
                        alt="Author"
                        className="w-14 h-14 rounded-full border-2 border-red-400"
                    />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {post?.author} <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-md ml-1">Author</span>
                        </h2>
                        <p className="text-sm text-gray-500">
                            {new Date(post?.time).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Optional Post Image */}
                {post?.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg object-cover max-h-80"
                    />
                )}

                {/* Title */}
                <motion.h1
                    className="text-3xl font-bold text-red-600"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {post?.post_title}
                </motion.h1>

                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed">
                    {post?.description || 'No description available.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {(Array.isArray(post?.tags) ? post?.tags : post?.tags?.split(','))?.map((tag, index) => (
                        <span key={index} className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>

                {/* Voting + Share Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 border-t pt-4">
                    <div className="flex gap-6 items-center">
                        <button
                            className="flex items-center gap-1 text-green-600 font-medium"
                            onClick={handleUpvote}
                        >
                            👍 {post?.upvote_count}
                        </button>
                        <button
                            className="flex items-center gap-1 text-red-600 font-medium"
                            onClick={handleDownvote}
                        >
                            👎 {post?.downvote_count}
                        </button>
                        <span className="text-sm text-gray-500">
                            Total Votes: <b>{(post?.upvote_count || 0) - (post?.downvote_count || 0)}</b>
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        <FacebookShareButton url={shareUrl} quote={post?.post_title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <WhatsappShareButton url={shareUrl} title={post?.post_title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700">
                        <FaRegCommentDots /> Comments ({post?.comments?.length || 0})
                    </h3>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-red-400"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button
                        onClick={handleAddComment}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Post Comment
                    </button>

                    <ul className="mt-4 space-y-3">
                        {post?.comments?.map((comment, index) => (
                            <li
                                key={index}
                                className="bg-red-50 px-4 py-2 rounded-md text-sm text-gray-700 border border-red-100"
                            >
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default PostDetails;
