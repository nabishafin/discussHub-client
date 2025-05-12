import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
    const faqs = [
        {
            id: 1,
            question: 'How do I create an account?',
            answer: 'To create an account, click on the "Sign Up" button at the top right corner of the page and fill out the registration form.',
        },
        {
            id: 2,
            question: 'How do I post a question?',
            answer: 'After logging in, go to the "New Post" section, enter your question, and click "Submit".',
        },
        {
            id: 3,
            question: 'How do I edit my profile?',
            answer: 'Click on your profile picture in the top right corner, then select "Edit Profile" to update your information.',
        },
        {
            id: 4,
            question: 'How do I report inappropriate content?',
            answer: 'Click the "Report" button on the post or comment, and our moderation team will review it.',
        },
        {
            id: 5,
            question: 'How do I reset my password?',
            answer: 'Go to the login page, click "Forgot Password", and follow the instructions sent to your email.',
        },
    ];

    const [expandedId, setExpandedId] = useState(null);

    const toggleFAQ = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <motion.div
            className="faq-section  py-8  px-4 md:w-10/12 w-full mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-black mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq) => (
                    <motion.div
                        key={faq.id}
                        className="faq-item bg-gray-100 p-5 rounded-[4px] border border-gray-300 "
                        whileHover={{
                            scale: 1.02,
                            borderColor: '#ef4444'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <button
                            className="w-full text-left flex justify-between items-center focus:outline-none"
                            onClick={() => toggleFAQ(faq.id)}
                        >
                            <h3 className="text-lg font-semibold text-black">{faq.question}</h3>
                            <motion.span
                                className="text-red-500"
                                animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {expandedId === faq.id ? (
                                    <FiChevronUp className="w-5 h-5" />
                                ) : (
                                    <FiChevronDown className="w-5 h-5" />
                                )}
                            </motion.span>
                        </button>
                        {expandedId === faq.id && (
                            <motion.div
                                className="overflow-hidden"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-gray-700 mt-4 pl-2 border-l-4 border-red-500">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;
