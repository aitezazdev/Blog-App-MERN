import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/Slices/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BlogApp</Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          
          {user ? (
            <>
              <Link to="/create-post" className="hover:text-gray-300">Create Post</Link>
              <Link to="/saved-posts" className="hover:text-gray-300">Saved Posts</Link>
              <button 
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
              <Link 
                to="/profile" 
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium"
                title={user?.name || 'Profile'}
              >
                {getInitials(user?.name)}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;