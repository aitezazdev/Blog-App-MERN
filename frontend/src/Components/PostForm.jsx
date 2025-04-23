import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../api/postsApi';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const PostForm = ({ post = null, isEditing = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isEditing && post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setTags(post.tags || []);
    }
  }, [post, isEditing]);

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if(tags.includes(trimmedTag)) {
      toast.error('Tag already exists');
      return;
    }
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    } else if (tags.length >= 5) {
      toast.error('Maximum 5 tags allowed');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const formData = {
        title,
        content,
        tags
      };
      
      if (isEditing) {
        await updatePost(post._id, formData);
        toast.success('Post updated successfully');
        navigate("/");
      } else {
        await createPost(formData);
        toast.success('Post created successfully');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error(err.response?.data?.message || 'Error submitting post');
      console.error('Error submitting post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
<form onSubmit={handleSubmit} className="space-y-6">
  {error && (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
      {error}
    </div>
  )}

  <div>
    <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
    <input
      id="title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border border-gray-300 rounded-xl p-3 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      placeholder="Catchy title goes here..."
      required
    />
  </div>

  <div>
    <label htmlFor="content" className="block text-sm font-semibold mb-2">Content</label>
    <textarea
      id="content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows="10"
      className="w-full border border-gray-300 rounded-xl p-3 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      placeholder="Write something great..."
      required
    />
    <p className="mt-1 text-sm text-gray-500">
      {content.length} characters • {content.trim().split(/\s+/).filter(Boolean).length} words
    </p>
  </div>

  <div>
    <label htmlFor="tags" className="block text-sm font-semibold mb-2">Tags <span className="text-gray-400">(up to 5)</span></label>
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 text-emerald-600 hover:text-emerald-800"
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
    <div className="flex">
      <input
        id="tagInput"
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagInputKeyDown}
        placeholder="Press Enter to add"
        className="flex-1 border border-gray-300 rounded-l-xl p-3 focus:ring-1 focus:outline-none focus:ring-emerald-300"
      />
      <button
        type="button"
        onClick={addTag}
        disabled={!tagInput.trim()}
        className="px-4 bg-emerald-600 text-white font-medium text-sm rounded-r-xl hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </div>
    <p className="text-sm text-gray-500 mt-1">Use comma or Enter to add new tag</p>
  </div>

  <div className="flex justify-end space-x-4 pt-4">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="py-2 px-5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50 hover:bg-gray-200 cursor-pointer"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="py-2 px-6 bg-emerald-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400"
    >
      {isSubmitting ? 'Submitting...' : isEditing ? 'Update Post' : 'Publish Post'}
    </button>
  </div>
</form>

  );
};

export default PostForm;