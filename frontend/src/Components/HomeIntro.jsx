import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const HomeIntro = ({ searchData }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      searchData(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [data, searchData]);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 py-10 relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
        Explore Thought-Provoking <br className="hidden sm:block" /> Blogs & Discussions
      </h1>
      <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mb-8">
        Dive into a world of meaningful content on our sleek, user-friendly
        platform. Start reading and sharing your voice today.
      </p>
      <div className="flex items-center border border-gray-700 rounded-xl px-4 py-2 w-full max-w-md ring-1 focus-within:ring-emerald-200 transition-all duration-150 ease-in-out bg-black/20 backdrop-blur-sm">
        <input
          value={data}
          onChange={handleChange}
          type="text"
          spellCheck="false"
          placeholder="Search Blogs"
          className="bg-transparent outline-none text-white flex-grow placeholder-gray-500 text-sm sm:text-base"
        />
        <FiSearch
          className="text-white text-xl cursor-pointer ml-2"
          onClick={() => searchData(data)}
        />
      </div>
    </section>
  );
};

export default HomeIntro;
