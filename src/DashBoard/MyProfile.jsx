import useAxiosPublic from "@/hooks/useAxiosPublic";
import { AuthContext } from "@/provider/AuthProvider";
import PostCard from "@/shared/PostCart";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const MyProfile = () => {

    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

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

    const userPosts = posts.filter(post => post.email === user.email)
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Profile Section */}
            <div className="flex items-center space-x-6">
                <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-semibold text-black">{user?.displayName}</h1> {/* Changed to text-black */}
                    <p className="text-black">{user.email}</p> {/* Changed to text-black */}
                </div>
            </div>

            {/* Badges Section */}
            <div className="mt-6 flex space-x-4">
                {user.isBronze && (
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">🥉</span>
                        <span className="text-sm text-black">Bronze Badge</span> {/* Changed to text-black */}
                    </div>
                )}
                {user.isGold && (
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">🏅</span>
                        <span className="text-sm text-black">Gold Badge</span> {/* Changed to text-black */}
                    </div>
                )}
            </div>

            {/* Recent Posts Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-black">Recent Posts</h2> {/* Changed to text-black */}
                <ul className="space-y-4 mt-4">
                    {userPosts.slice(0, 2).map((post, index) =>
                        <PostCard
                            key={post._id}
                            post={post}
                        ></PostCard>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyProfile;
