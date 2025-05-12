import React from 'react';


const SocialMediaSection = () => {
  return (
    <section className="bg-gray-900 text-white py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/path-to-your-image.jpg"
            alt="Team working"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <p className="text-blue-500 text-sm uppercase font-semibold mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">To Highest Quality Services</h2>
          <p className="text-gray-300 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.
          </p>
          <p className="text-gray-400 mb-6">
            Mauris vitae quam at ex dictum elementum. Curabitur nec posuere ante. Nulla facilisi.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
            Read More
          </button>
        </div>
      </div>
    </section>

  );
};

export default SocialMediaSection;
