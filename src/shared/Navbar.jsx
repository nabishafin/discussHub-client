import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo-96.png'
import { MdNotificationAdd } from 'react-icons/md';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const axiosPublic = useAxiosPublic();
    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        },
    });

    // console.log(announcements);


    const links =
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/membership'>Membership</NavLink></li>
            <li>
                <button className="flex items-center gap-1 ">
                    <MdNotificationAdd size={25} />
                    <div className="badge badge-secondary mb-3">+{announcements.length}</div>
                </button>
            </li>
        </>

    return (
        <div>
            <div className="navbar  z-10 bg-gradient-to-r from-black via-[#0f4f4f] to-black text-white " >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className='flex  items-center justify-center '>
                        <img className='w-12 hidden md:block' src={logo} alt="" />
                        <Link to="/" className="text-2xl font-bold">DiscussHub</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold flex items-center">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul>
                        {!user && (
                            <li>
                                <Link className='font-bold mr-2' to='/login'>Join Us</Link>
                            </li>
                        )}
                    </ul>
                    {user && (
                        <div className='dropdown dropdown-end z-50'>
                            <div
                                tabIndex={0}
                                role='button'
                                className='btn btn-ghost btn-circle avatar'
                            >
                                <div title={user?.displayName} className='w-10 rounded-full'>
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt='User Profile Photo'
                                        src={user?.photoURL}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black'
                            >
                                {/* Display user name, not clickable */}
                                <li>
                                    <span className='font-semibold text-blue-500'>{user?.displayName}</span>
                                </li>

                                {/* Dashboard link */}
                                <li>
                                    <Link to='/dashboard/myprofile' className='justify-between'>
                                        Dashboard
                                    </Link>
                                </li>

                                {/* Logout button */}
                                <li className='mt-2'>
                                    <button
                                        onClick={() => logOut()} // Implement your logOut function
                                        className='bg-gray-200 block text-center w-full py-2 rounded'
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Navbar;