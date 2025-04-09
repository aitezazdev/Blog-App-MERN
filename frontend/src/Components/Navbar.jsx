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

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BlogApp</Link>
        
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          
          {user ? (
            <>
              <Link to="/create-post" className="hover:text-gray-300">Create Post</Link>
              <Link to="/saved-posts" className="hover:text-gray-300">Saved Posts</Link>
              <Link to="/profile" className="hover:text-gray-300">
                {user?.name || 'Profile'}
              </Link>
              <button 
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
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