import useAxiosPublic from "@/hooks/useAxiosPublic";
import { AuthContext } from "@/provider/AuthProvider";
import PostCart from "@/shared/PostCart";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const MainContainer = () => {
    const { searchTerm } = useContext(AuthContext); // Get search term from context
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState('');

    const axiosPublic = useAxiosPublic();
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        },
    });

    // Fetch tags (categories)
    useEffect(() => {
        fetch('tags.json')
            .then(res => res.json())
            .then(res => setTags(res))
            .catch(err => console.error('Error fetching tags:', err));
    }, []);


    let categoryPosts;
    if (category === '') {
        categoryPosts = posts;
    } else if (category === 'someCategory') {
        categoryPosts = posts.filter(data =>
            data.tags && data.tags.includes('someCategory')
        );
    } else if (category === 'anotherCategory') {
        categoryPosts = posts.filter(data =>
            data.tags && data.tags.includes('anotherCategory')
        );
    } else {
        categoryPosts = posts.filter(data =>
            data.tags && data.tags.includes(category)
        );
    }

    // Filter category posts by search term as well
    if (searchTerm) {
        categoryPosts = categoryPosts.filter(post => {

            const tagsArray = Array.isArray(post.tags) ? post.tags : post.tags.split(",").map(tag => tag.trim());

            return (
                tagsArray.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }

    return (
        <div className="my-5 w-full md:w-10/12 mx-auto px-4">
            {/* Tabs at the top */}
            <div role="tablist" className="tabs tabs-bordered tab-border-red flex flex-wrap justify-center gap-2 mb-5">
                <input
                    onClick={() => setCategory('')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="All"
                    defaultChecked
                />
                <input
                    onClick={() => setCategory('programming')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Programming"
                />
                <input
                    onClick={() => setCategory('health')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Health"
                />
                <input
                    onClick={() => setCategory('travel')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Travel"
                />
                <input
                    onClick={() => setCategory('food')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Food"
                />
                <input
                    onClick={() => setCategory('photography')}
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Photography"
                />
            </div>


            <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryPosts.map(post => (
                        <PostCart key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContainer;