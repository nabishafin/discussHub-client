import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/provider/AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // State to track if the user can add posts
    const [canAddPost, setCanAddPost] = useState(true);

    // Fetch the number of posts the user has made
    useEffect(() => {
        if (user) {
            axiosPublic.get(`/posts/count/${user.email}`)
                .then(res => {
                    const postCount = res.data.count;
                    if (postCount >= 5) {
                        setCanAddPost(false);  // User has exceeded the post limit
                    }
                })
                .catch(err => {
                    console.error('Error fetching post count:', err);
                });
        }
    }, [user, axiosPublic]);

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission

        // Getting all the values from the form
        const form = e.target;
        const authorImg = form.authorImg.value;
        const name = form.name.value;
        const email = form.email.value;
        const postTitle = form.postTitle.value;
        const description = form.descriptation.value;
        const category = form.category.value;

        const obj = {
            author_img: authorImg,       // Changed from authorImg to author_img
            author: name,
            post_title: postTitle,       // Changed from postTitle to post_title
            tags: [],                    // Add tags as an empty array, or you can populate it
            time: new Date().toISOString(),
            comments: [],
            upvote_count: 0,             // Changed from upvoteCount to upvote_count
            downvote_count: 0,           // Changed from downvoteCount to downvote_count
            votes_count: 0,
            description: description,
            email: email,
            tags: category
        };

        axiosPublic.post('/posts', obj)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Post Added');
                    form.reset();
                    navigate('/');
                }
            });

        console.log(obj);
    };

    const handleBecomeMemberClick = () => {
        navigate('/membership');  // Navigate to the Membership Page
    };

    return (
        <div className='m-5'>
            {canAddPost ? (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4 ">
                        <label htmlFor="authorImage" className="block text-gray-700 font-medium">Author Image</label>
                        <input name='authorImg' required type="text" id="authorImage" className="mt-1 block w-full text-sm text-gray-500 border p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter image URL" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="authorName" className="block text-gray-700 font-medium">Author Name</label>
                        <input name='name' type="text" id="authorName" defaultValue={user?.displayName} disabled={true} className="mt-1 block w-full border text-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Author Name" readOnly />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="authorEmail" className="block text-gray-700 font-medium">Author Email</label>
                        <input name='email' type="email" id="authorEmail" defaultValue={user?.email} disabled={true} className="mt-1 block w-full border  text-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Author Email" />
                    </div>

                    <div className="mb-4 text-gray-400">
                        <label htmlFor="postTitle" className="block text-gray-700 font-medium">Post Title</label>
                        <input name='postTitle' required type="text" id="postTitle" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Post Title" />
                    </div>

                    <div className="mb-4 text-gray-400">
                        <label htmlFor="postDescription" className="block text-gray-700 font-medium">Post Description</label>
                        <textarea name='descriptation' required id="postDescription" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Post Description"></textarea>
                    </div>

                    <div className="mb-4 text-gray-500">
                        <label htmlFor="tag" className="block text-gray-700 font-medium">
                            Tag
                        </label>
                        <select name='category' required id="tag" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option className="text-gray-500" value="" disabled selected>Select a tag</option>
                            <option className="text-gray-500" value="tech">programming</option>
                            <option className="text-gray-500" value="health">health</option>
                            <option className="text-gray-500" value="finance">travel</option>
                            <option className="text-gray-500" value="lifestyle">food</option>
                            <option className="text-gray-500" value="education">photography</option>
                        </select>
                    </div>

                    <div className="mb-4 text-gray-400">
                        <label htmlFor="upVote" className="block text-gray-700 font-medium">UpVote</label>
                        <input name='upVote' required type="number" id="upVote" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div className="mb-4 text-gray-400">
                        <label htmlFor="downVote" className="block text-gray-700 font-medium">DownVote</label>
                        <input name='doenvote' required type="number" id="downVote" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="w-full bg-indigo-600 text-white font-medium p-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
