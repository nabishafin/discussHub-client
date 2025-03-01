import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { LiaCommentsSolid } from "react-icons/lia";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allposts');
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching posts:", err);
        }
    });

    // Filter posts that belong to the logged-in user
    const userPosts = posts.filter(post => post.email === user.email);

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this post",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/posts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Post has been deleted.", "success");
                            refetch();  // Ensure this re-fetches the posts
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete the post.", "error");
                    });
            }
        });
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-700 mb-6">My Posts</h1>
                <div className="overflow-y-auto max-h-[900px]">
                    {/* Table container with scroll functionality */}
                    <table className="min-w-full bg-white text-gray-900 border border-gray-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-center text-gray-700">Post Title</th>
                                {/* Hide on small screens, show on medium and larger screens */}
                                <th className="p-4 text-sm font-semibold text-center text-gray-700 hidden md:table-cell">Number of votes</th>
                                <th className="p-4 text-sm font-semibold text-center text-gray-700">Comment Button</th>
                                <th className="p-4 text-sm font-semibold text-center text-gray-700">Delete Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPosts.map((post) => (
                                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-4 text-sm text-gray-800 text-center">{post.post_title}</td>
                                    {/* Hide on small screens, show on medium and larger screens */}
                                    <td className="p-4 text-sm text-gray-800 text-center hidden md:table-cell">{post.votes_count}</td>
                                    <td className="p-4 text-sm text-sky-800 text-center font-bold">
                                        <button className="text-center">
                                            <Link to={`/postdetails/${post._id}`}>
                                                <LiaCommentsSolid size={24} />
                                            </Link>
                                        </button>
                                    </td>
                                    <td className="p-4 text-sm text-red-600 text-center font-bold">
                                        <button onClick={() => { handleDeleteUser(post._id) }}>
                                            <RiDeleteBin6Fill size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPost;
