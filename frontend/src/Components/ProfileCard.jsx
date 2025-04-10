import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/authApi';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await updateUserProfile(formData);
      if (response.success) {
        setProfile(response.data);
        setEditing(false);
      } else {
        setError(response.message || 'Update failed');
      }
    } catch (err) {
      setError(err.message || 'Update request failed');
    }
  };

  if (loading) return <div className="text-center py-4">Loading profile...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-4">No profile data available</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
          {getInitials(profile.name)}
        </div>
        <div className="ml-4">
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-xl font-semibold border-b border-gray-400 focus:outline-none"
            />
          ) : (
            <h2 className="text-xl font-semibold">{profile.name}</h2>
          )}
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-gray-700">Bio</h3>
        {editing ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="3"
          />
        ) : (
          <p className="mt-1 text-gray-600">{profile.bio || 'No bio available'}</p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">Posts:</span> {profile.createdPosts.length}
          </div>
          <div>
            <span className="font-medium">Saved:</span> {profile.savedPosts.length}
          </div>
          <div>
            <span className="font-medium">Member since:</span> {new Date(profile.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end items-center space-x-2">
        {editing ? (
          <>
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
