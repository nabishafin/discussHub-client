import React from 'react';

const Button = ({ text }) => {
    return (
        <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-[4px] shadow-md transition-colors r">
            {text}
        </button>
    );
};

export default Button;