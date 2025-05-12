import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const stripePromise = loadStripe('pk_test_51QjcFBIkyTa1ikFPKaxYYhyE1WMurwr043SuPJ0gLPrWbMkLOvH2AgzaTotLvfoC6gbgRyOaGGu0YDtyLIDdLXSD00dXyzTFaC');

const Payment = () => {
    return (
        <section className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
            <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        className="inline-block bg-red-100 p-4 rounded-full mb-4"
                        whileHover={{ rotate: 5 }}
                    >
                        <FaCreditCard className="text-red-500 text-3xl" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Membership Payment</h1>
                    <p className="text-gray-600 mt-2">Secure your Gold Membership in just a few clicks</p>
                </div>

                {/* Payment Info */}
                <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-semibold text-gray-700">💳 Payment Amount:</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">200৳ BDT</p>
                    <p className="text-gray-500 mt-1 text-sm">One-time payment for lifetime Gold access</p>
                </div>

                {/* Stripe Checkout Form */}
                <div className="mt-6">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>

                {/* Benefits Reminder */}
                <div className="text-sm text-gray-500 border-t pt-4">
                    <p className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Secure and encrypted payment
                    </p>
                    <p className="flex items-center justify-center gap-2 mt-1">
                        <FaCheckCircle className="text-green-500" />
                        Instant membership activation after success
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Payment;
