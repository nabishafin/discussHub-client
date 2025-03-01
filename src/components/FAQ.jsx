import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
    // Static data for FAQs
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

    // State to manage which FAQ is expanded
    const [expandedId, setExpandedId] = useState(null);

    const toggleFAQ = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <motion.div
            className="faq-section bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq) => (
                    <motion.div
                        key={faq.id}
                        className="faq-item bg-gray-50 p-4 rounded-lg shadow-md"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <button
                            className="w-full text-left flex justify-between items-center"
                            onClick={() => toggleFAQ(faq.id)}
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                            <motion.span
                                className="text-xl"
                                animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {expandedId === faq.id ? '▲' : '▼'}
                            </motion.span>
                        </button>
                        {expandedId === faq.id && (
                            <motion.p
                                className="text-gray-600 mt-2"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {faq.answer}
                            </motion.p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;