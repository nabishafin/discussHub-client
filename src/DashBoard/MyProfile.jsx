import useAxiosPublic from "@/hooks/useAxiosPublic";
import { AuthContext } from "@/provider/AuthProvider";
import PostCard from "@/shared/PostCart";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const MyProfile = () => {
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

    const userPosts = posts.filter(post => post.email === user.email);

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
                <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-semibold text-black">{user?.displayName}</h1>
                    <p className="text-black">{user.email}</p>
                </div>
            </div>

            {/* Badges Section */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start space-x-4">
                {user.isBronze && (
                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <span className="text-yellow-600">🥉</span>
                        <span className="text-sm text-black">Bronze Badge</span>
                    </div>
                )}
                {user.isGold && (
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">🏅</span>
                        <span className="text-sm text-black">Gold Badge</span>
                    </div>
                )}
            </div>

            {/* Recent Posts Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-black">Recent Posts</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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