
import useAdmin from '@/hooks/useAdmin';
import React, { useState } from 'react';
import { FaHome, FaSearch, FaUsers } from 'react-icons/fa';
import { FaBookBookmark, FaCalendar, FaCartFlatbedSuitcase } from 'react-icons/fa6';
import { IoMenuSharp } from 'react-icons/io5';
import { MdContactMail, MdOutlineReviews } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';


const DashBoard = () => {

    const [isAdmin] = useAdmin()
    console.log(isAdmin)



    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row text-white font-bold">
            {/* Sidebar */}
            <div className="md:w-[250px] bg-black  md:min-h-screen border-2">
                <Link to='/'>
                    <div className='my-7 flex flex-col justify-center items-center'>
                        <p className='text-3xl font-bold'>DISCUSS HUB</p>
                        <p className='text-lg font-bold '>FOURM</p>
                    </div>
                </Link>
                <ul className="menu px-4 hidden md:block">
                    {/* Conditional Rendering for Admin vs User */}
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminprofile">
                                    <FaHome />
                                    Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/alluser">
                                    <FaUsers />
                                    Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/announcement">
                                    <FaUsers />
                                    Make Announcement
                                </NavLink>
                            </li>

                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/myprofile">
                                    <FaBookBookmark />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addpost">
                                    <FaBookBookmark />
                                    Add Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mypost">
                                    <FaBookBookmark />
                                    My Post
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="horizontal-line border-[1px]"></div>



                    {/* Common links */}
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/membership">
                            <IoMenuSharp />
                            MemberShip
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/ourShop/contact">
                            <MdContactMail />
                            Contact
                        </NavLink>
                    </li>
                </ul>

                {/* Mobile menu toggle */}
                <div className="flex md:hidden p-4  from-black via-[#022121] to-black">
                    <button
                        className="text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        Dashboard
                    </button>
                </div>
                <ul
                    id="mobile-menu"
                    className={`menu p-4  from-black via-[#022121] to-black] ${isMobileMenuOpen ? '' : 'hidden'}`}
                >
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminprofile">
                                    <FaHome />
                                    Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/alluser">
                                    <FaUsers />
                                    Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/announcement">
                                    <FaUsers />
                                    Make Announcement
                                </NavLink>
                            </li>

                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/mybookings">
                                    <FaBookBookmark />
                                    My Bookings
                                </NavLink>
                            </li>
                            {/* Add other user-specific links */}
                        </>
                    )}

                    <div className="divider px-2"></div>

                    {/* Common links */}
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 px-2 ">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
