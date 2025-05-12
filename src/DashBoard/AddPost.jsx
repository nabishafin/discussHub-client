import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/provider/AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [canAddPost, setCanAddPost] = useState(true);

    useEffect(() => {
        if (user) {
            axiosPublic.get(`/posts/count/${user.email}`)
                .then(res => {
                    const postCount = res.data.count;
                    if (postCount >= 5) {
                        setCanAddPost(false);
                    }
                })
                .catch(err => {
                    console.error('Error fetching post count:', err);
                });
        }
    }, [user, axiosPublic]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const authorImg = form.authorImg.value;
        const name = form.name.value;
        const email = form.email.value;
        const postTitle = form.postTitle.value;
        const description = form.descriptation.value;
        const category = form.category.value;

        const obj = {
            author_img: authorImg,
            author: name,
            post_title: postTitle,
            tags: category,
            time: new Date().toISOString(),
            comments: [],
            upvote_count: 0,
            downvote_count: 0,
            votes_count: 0,
            description: description,
            email: email
        };

        axiosPublic.post('/posts', obj)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Post Added');
                    form.reset();
                    navigate('/');
                }
            });
    };

    const handleBecomeMemberClick = () => {
        navigate('/membership');
    };

    return (
        <div className='m-5'>
            {canAddPost ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="authorImg" className="block text-gray-700 font-medium">Author Image</label>
                        <input
                            name='authorImg'
                            required
                            type="text"
                            id="authorImg"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="authorName" className="block text-gray-700 font-medium">Author Name</label>
                        <input
                            name='name'
                            type="text"
                            id="authorName"
                            defaultValue={user?.displayName}
                            disabled
                            readOnly
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="authorEmail" className="block text-gray-700 font-medium">Author Email</label>
                        <input
                            name='email'
                            type="email"
                            id="authorEmail"
                            defaultValue={user?.email}
                            disabled
                            readOnly
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="postTitle" className="block text-gray-700 font-medium">Post Title</label>
                        <input
                            name='postTitle'
                            required
                            type="text"
                            id="postTitle"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter Post Title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="postDescription" className="block text-gray-700 font-medium">Post Description</label>
                        <textarea
                            name='descriptation'
                            required
                            id="postDescription"
                            rows="4"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter Post Description"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tag" className="block text-gray-700 font-medium">Tag</label>
                        <select
                            name='category'
                            required
                            id="tag"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="" disabled selected>Select a tag</option>
                            <option value="tech">Programming</option>
                            <option value="health">Health</option>
                            <option value="finance">Travel</option>
                            <option value="lifestyle">Food</option>
                            <option value="education">Photography</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="upVote" className="block text-gray-700 font-medium">UpVote</label>
                        <input
                            name='upVote'
                            required
                            type="number"
                            id="upVote"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="downVote" className="block text-gray-700 font-medium">DownVote</label>
                        <input
                            name='doenvote'
                            required
                            type="number"
                            id="downVote"
                            className="mt-1 block w-full border p-2 text-black border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white font-medium p-2 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Submit Post
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    <p className="text-xl text-gray-700 mb-4">You have reached the limit of 5 posts. Become a member to post more.</p>
                    <button
                        onClick={handleBecomeMemberClick}
                        className="w-full bg-blue-600 text-white font-medium p-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Become a Member
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPost;
