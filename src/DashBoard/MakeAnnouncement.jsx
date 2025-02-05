import useAxiosPublic from '@/hooks/useAxiosPublic';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const authorName = form.authorName.value;
        const title = form.title.value;
        const authorImage = form.authorImage.value;
        const description = form.description.value;

        const obj = { authorImage, authorName, title, description }
        console.log(obj)

        axiosPublic.post('/announcement', obj)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Post Added');
                    form.reset();
                    navigate('/');
                }
            });

    }



    return (
        <div>
            <div class="min-h-screen flex justify-center items-center text-black">
                <div class="card p-0 md:p-10 w-full bg-white shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title text-center text-2xl font-semibold">Make Announcement</h2>

                        <form onSubmit={(e) => { handlesubmit(e) }} action="#" method="POST">

                            <div class="form-control mb-4">
                                <label for="authorImage" class="label">
                                    <span class="label-text">Author Image URL</span>
                                </label>
                                <input type="text" id="authorImage" name="authorImage" class="input input-bordered input-primary" />
                                <small class="text-gray-500">Enter the image URL for the author.</small>
                            </div>


                            <div class="form-control mb-4">
                                <label for="authorName" class="label">
                                    <span class="label-text">Author Name</span>
                                </label>
                                <input type="text" id="authorName" name="authorName" class="input input-bordered input-primary" placeholder="Enter author's name" required />
                                <small class="text-gray-500">Full name of the author.</small>
                            </div>



                            <div class="form-control mb-4">
                                <label for="title" class="label">
                                    <span class="label-text">Title</span>
                                </label>
                                <input type="text" id="title" name="title" class="input input-bordered input-primary" placeholder="Enter announcement title" required />
                            </div>


                            <div class="form-control mb-4">
                                <label for="description" class="label">
                                    <span class="label-text">Description</span>
                                </label>
                                <textarea id="description" name="description" class="textarea textarea-bordered textarea-primary" placeholder="Enter announcement description" required></textarea>
                            </div>

                            <div class="form-control mt-4">
                                <button type="submit" class="btn btn-primary w-full">Submit Announcement</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MakeAnnouncement;