import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/UseAxiosSecure';
import { AuthContext } from '@/provider/AuthProvider';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user, gold } = useContext(AuthContext);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleMakeAdmin = (id) => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Admin Role has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete the user.", "error");
                    });
            }
        });
    };

    return (
        <div className="border-2 h-screen">
            <div className="bg-slate-100 p-2 md:p-5 mx-0 md:mx-5">
                <div className="md:flex-row my-3">
                    <p className="text-xl md:text-2xl font-bold mb-2 text-black">Total users: {users.length}</p>
                </div>
                <div>
                    {users.length === 0 ? (
                        <p className="text-center text-gray-500">No users found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                {/* Table Head */}
                                <thead className="bg-black">
                                    <tr className='text-red-600'>
                                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">#</th>
                                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">NAME</th>
                                        {/* Hide Email and Subscription Status on mobile */}
                                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 hidden md:table-cell">EMAIL</th>
                                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Make admin</th>
                                        <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 hidden md:table-cell">Subscription Status</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody className="bg-white">
                                    {users.map(({ _id, name, email, role }, index) => (
                                        <tr key={_id} className="bg-base-200">
                                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center text-black">{index + 1}</td>
                                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center text-black">{name || "Unknown"}</td>
                                            {/* Hide Email and Subscription Status on mobile */}
                                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center text-black hidden md:table-cell">{email || "N/C"}</td>
                                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center">
                                                {
                                                    role === "admin" ? <div className='text-black'>Admin</div> :
                                                        <button onClick={() => handleMakeAdmin(_id)} className="px-2 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded">
                                                            <FaUsers className="inline-block" />
                                                        </button>
                                                }
                                            </td>
                                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center hidden md:table-cell">
                                                <button onClick={() => { handleDeleteUser(_id) }} className="px-2 py-1 md:px-4 md:py-2 bg-yellow-500 text-white rounded">
                                                    Bronze
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;