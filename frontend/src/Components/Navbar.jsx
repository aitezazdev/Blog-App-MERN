import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successful");
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-10 text-white bg-black p-5 transition-all duration-300`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            BlogApp
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`relative pb-1 px-1 transition-colors ${isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Home
              {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>}
            </Link>

            {user ? (
              <>
                <Link 
                  to="/saved-posts" 
                  className={`relative pb-1 px-1 transition-colors ${isActive('/saved-posts') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Saved Posts
                  {isActive('/saved-posts') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className={`w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium transition-transform hover:scale-105 ${isActive('/profile') ? 'ring-2 ring-blue-300' : ''}`}
                  title={user?.name || "Profile"}
                >
                  {getInitials(user?.name)}
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`relative pb-1 px-1 transition-colors ${isActive('/login') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Login
                  {isActive('/login') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>}
                </Link>
                <Link 
                  to="/register" 
                  className={`relative pb-1 px-1 transition-colors ${isActive('/register') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Register
                  {isActive('/register') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full"></span>}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;