import React from 'react';
import { FiSearch } from 'react-icons/fi';

const HomeIntro = () => {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 relative z-10">
      <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
        Explore Thought-Provoking <br /> Blogs & Discussions
      </h1>
      <p className="text-gray-400 text-lg sm:text-lg max-w-2xl mb-8">
        Dive into a world of meaningful content on our sleek, user-friendly platform. Start reading and sharing your voice today.
      </p>
      <div className="flex items-center bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search Blogd"
          className="bg-transparent outline-none text-white flex-grow placeholder-gray-500"
        />
        <FiSearch className="text-white text-xl" />
      </div>
    </section>
  );
};

export default HomeIntro;
