import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo icon.png';
import { MdNotificationAdd } from 'react-icons/md';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        },
    });

    useEffect(() => {
        setIsMenuActive(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileDropdownRef]);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/membership', label: 'Membership' },
    ];

    return (
        <div className="bg-black text-white z-10 sticky top-0">
            <div className=" w-full md:w-10/12 mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img className="w-10 md:w-12 mr-2" src={logo} alt="Logo" />
                            <span className="text-3xl font-bold text-white">DiscussHub</span>
                        </Link>
                    </div>

                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isMenuActive ? (
                                    <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z" clipRule="evenodd" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" clipRule="evenodd" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative text-white hover:text-gray-300 transition duration-200 pb-1 ${isActive(link.to) ? 'text-[#ff0000] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#ff0000]' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button className="relative flex items-center gap-1 text-white">
                            <div className="relative">
                                <MdNotificationAdd size={28} />
                                {announcements.length > 0 && (
                                    <span className="absolute -top-1 -right-5 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {announcements.length}
                                    </span>
                                )}
                            </div>
                        </button>

                        {!user && (
                            <Link className="font-bold text-white hover:text-gray-300 transition duration-200" to="/login">Join Us</Link>
                        )}
                        {user && (
                            <div className="relative" ref={profileDropdownRef}>
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="inline-flex items-center  ml-10 text-white hover:text-gray-300 focus:outline-none"
                                    id="user-menu-button"
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true"
                                >
                                    <div title={user?.displayName} className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt="User Profile"
                                            src={user?.photoURL}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span>{user?.displayName.split(' ')[0]}</span>
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                        <div className="py-1" role="none">
                                            <Link to="/dashboard/myprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                Your Profile
                                            </Link>
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                Dashboard
                                            </Link>
                                            <button onClick={logOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {isMenuActive && (
                    <div className="lg:hidden py-2">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`text-white hover:text-gray-300 transition duration-200 block py-2 px-4 ${isActive(link.to) ? 'text-[#ff0000]' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="py-2 px-4">
                                <button className="relative flex items-center gap-1 text-white">
                                    <div className="relative">
                                        <MdNotificationAdd size={28} />
                                        {announcements.length > 0 && (
                                            <span className="absolute -top-1 -right-5 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {announcements.length}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </div>
                            {user && (
                                <>
                                    <Link to="/dashboard/myprofile" className="font-bold text-white hover:text-gray-300 transition duration-200 block py-2 px-4">Profile</Link>
                                    <Link to="/dashboard" className="font-bold text-white hover:text-gray-300 transition duration-200 block py-2 px-4">Dashboard</Link>
                                    <button onClick={logOut} className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 block py-2 px-4 rounded">Logout</button>
                                </>
                            )}
                            {!user && (
                                <Link className="font-bold text-white hover:text-gray-300 transition duration-200 block py-2 px-4" to="/login">Join Us</Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;