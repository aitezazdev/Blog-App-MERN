import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../api/postsApi';
import { toast } from 'react-hot-toast';
import PostForm from '../Components/PostForm';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.response?.data?.message || 'Failed to load post');
        toast.error('Failed to load post for editing');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-red-50 border border-red-200 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#201f1f] text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <div className="rounded-xl shadow-md p-6">
          {post && <PostForm post={post} isEditing={true} />}
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
