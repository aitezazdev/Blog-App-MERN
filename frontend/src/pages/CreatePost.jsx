// src/Pages/CreatePost.js
import React from 'react';
import PostForm from '../Components/PostForm';

const CreatePost = () => {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;