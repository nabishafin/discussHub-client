import useAxiosPublic from '@/hooks/useAxiosPublic';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const authorName = form.authorName.value;
        const title = form.title.value;
        const authorImage = form.authorImage.value;
        const description = form.description.value;

        const obj = { authorImage, authorName, title, description };
        console.log(obj);

        axiosPublic.post('/announcement', obj)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Post Added');
                    form.reset();
                    navigate('/');
                }
            });
    };

    return (
        <div>
            <div className="min-h-screen flex justify-center items-center text-black">
                <div className="card p-0 md:p-10 w-full max-w-2xl bg-white shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-center text-2xl font-semibold">Make Announcement</h2>

                        <form onSubmit={handlesubmit}>

                            <div className="form-control mb-4">
                                <label htmlFor="authorImage" className="label">
                                    <span className="label-text">Author Image URL</span>
                                </label>
                                <input type="text" id="authorImage" name="authorImage" className="input input-bordered input-primary" />
                                <small className="text-gray-500">Enter the image URL for the author.</small>
                            </div>

                            <div className="form-control mb-4">
                                <label htmlFor="authorName" className="label">
                                    <span className="label-text">Author Name</span>
                                </label>
                                <input type="text" id="authorName" name="authorName" className="input input-bordered input-primary" placeholder="Enter author's name" required />
                                <small className="text-gray-500">Full name of the author.</small>
                            </div>

                            <div className="form-control mb-4">
                                <label htmlFor="title" className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" id="title" name="title" className="input input-bordered input-primary" placeholder="Enter announcement title" required />
                            </div>

                            <div className="form-control mb-4">
                                <label htmlFor="description" className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea id="description" name="description" className="textarea textarea-bordered textarea-primary" placeholder="Enter announcement description" required></textarea>
                            </div>

                            <div className="form-control mt-4">
                                <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700 w-full">
                                    Submit Announcement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
