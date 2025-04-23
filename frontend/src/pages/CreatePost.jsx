import React from 'react';
import PostForm from '../Components/PostForm';

const CreatePost = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-16 pb-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl shadow-lg p-8 bg-[#201f1f] text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create a New Post
          </h1>
          <PostForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
