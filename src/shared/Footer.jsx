import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className=" bg-black">
            <footer className="bg-black text-white py-10 grid grid-cols-1 md:grid-cols-4 gap-8 w-full md:w-10/12 mx-auto px-4">
                <aside className="flex flex-col items-start">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current mb-2"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p className="text-lg font-semibold">DiscussHub</p>
                    <p className="text-sm text-gray-400">Connecting people, one discussion at a time.</p>
                </aside>

                <nav>
                    <h6 className="text-xl font-semibold mb-2 text-red-600">Forum Sections</h6>
                    <ul className="space-y-1">
                        <li><a className="link link-hover">General Discussion</a></li>
                        <li><a className="link link-hover">Tech Support</a></li>
                        <li><a className="link link-hover">Feedback</a></li>
                        <li><a className="link link-hover">Community Guidelines</a></li>
                    </ul>
                </nav>

                <nav>
                    <h6 className="text-xl font-semibold mb-2 text-red-600">Social Media</h6>
                    <ul className="space-y-2">
                        <li>
                            <a href="https://facebook.com" className="flex items-center gap-2 hover:text-red-500">
                                <FaFacebook size={20} /> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" className="flex items-center gap-2 hover:text-red-500">
                                <FaTwitter size={20} /> Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" className="flex items-center gap-2 hover:text-red-500">
                                <FaInstagram size={20} /> Instagram
                            </a>
                        </li>
                    </ul>
                </nav>

                <nav>
                    <h6 className="text-xl font-semibold mb-2 text-red-600">Legal</h6>
                    <ul className="space-y-1">
                        <li><a className="link link-hover">Terms of Use</a></li>
                        <li><a className="link link-hover">Privacy Policy</a></li>
                        <li><a className="link link-hover">Cookie Policy</a></li>
                    </ul>
                </nav>
            </footer>

            <footer className="footer-center bg-black text-white p-4 text-sm">
                <p>© {new Date().getFullYear()} <span className='text-red-600'>DiscussHub</span> — All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;
