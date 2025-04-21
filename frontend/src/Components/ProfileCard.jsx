import React, { useState, useEffect } from 'react';
import { UserCircle, Edit2, Save, X, Trash2, Loader } from 'lucide-react';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Slices/authSlice';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();

        if (response.success) {
          setProfile(response.data);
          setFormData({
            name: response.data.name || '',
            bio: response.data.bio || '',
          });
        } else {
          setError(response.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(formData);
      if (response.success) {
        setProfile(response.data);
        setEditing(false);
      } else {
        setError(response.message || 'Update failed');
      }
    } catch (err) {
      setError(err.message || 'Update request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteUserAccount();
      dispatch(logout());
      navigate('/register');
    } catch (err) {
      console.error('Account deletion failed:', err);
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      handleDeleteAccount();
    }
  };

  if (loading && !profile) return (
    <div className="flex justify-center items-center py-12">
      <Loader className="animate-spin text-gray-600 mr-2" size={24} />
      <span className="text-gray-600">Loading profile...</span>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600 max-w-md mx-auto mt-10">
      <p>{error}</p>
    </div>
  );
  
  if (!profile) return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-600 max-w-md mx-auto mt-10">
      No profile data available
    </div>
  );

  return (
    <div className="bg-[#171616] rounded-lg shadow-xl p-8 w-[550px] mx-auto mt-10 text-gray-100 border border-[#1f1e1e]">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            getInitials(profile.name)
          )}
        </div>
        <div className="ml-5 flex-1">
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-xl font-semibold bg-[#1f1e1e] border-b border-gray-600 focus:outline-none focus:border-blue-500 text-white w-full px-2 py-1"
              placeholder="Your name"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          )}
          <p className="text-gray-400 flex items-center mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            {profile.email}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-[#1f1e1e] rounded-lg p-4">
        <h3 className="font-medium text-gray-300 flex items-center mb-2">
          <UserCircle size={18} className="mr-2" />
          About
        </h3>
        
        {editing ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-2 w-full bg-[#1f1e1e] border border-gray-600 rounded p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#1f1e1e] text-gray-100"
            rows="4"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="mt-2 text-gray-300 leading-relaxed">
            {profile.bio || 'No bio available'}
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-[#1f1e1e] rounded-lg p-3">
          <p className="text-2xl font-bold text-blue-400">{profile.createdPosts.length}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Posts</p>
        </div>
        
        <div className="bg-[#1f1e1e] rounded-lg p-3">
          <p className="text-2xl font-bold text-purple-400">{profile.savedPosts.length}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Saved</p>
        </div>
        
        <div className="bg-[#1f1e1e] rounded-lg p-3 flex flex-col justify-center items-center">
          <p className="text-sm font-semibold text-gray-300">
            {new Date(profile.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </p>
          <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Joined</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center">
        {editing ? (
          <div className="flex space-x-3">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition duration-150 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-700 cursor-pointer text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center transition duration-150"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-[#1f1e1e] cursor-pointer text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center transition duration-150"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </button>
        )}

        <button
          onClick={confirmDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 cursor-pointer flex items-center transition duration-150 disabled:opacity-50"
        >
          <Trash2 size={16} className="mr-1" />
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;