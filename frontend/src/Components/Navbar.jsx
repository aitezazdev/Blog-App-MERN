import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successful");
    setMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 md:px-24 text-white bg-black p-5 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            ZazBlog
          </NavLink>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `px-1 transition-colors ${
                  isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => 
                `px-1 transition-colors ${
                  isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                }`
              }
            >
              About
            </NavLink><NavLink
              to="/contact"
              className={({ isActive }) => 
                `px-1 transition-colors ${
                  isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/saved-posts"
                  className={({ isActive }) => 
                    `px-1 transition-colors ${
                      isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  Saved Posts
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => 
                    `w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium transition-transform hover:scale-105 ${
                      isActive ? "ring-2 ring-emerald-300" : ""
                    }`
                  }
                  title={user?.name || "Profile"}
                >
                  {getInitials(user?.name)}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => 
                    `px-1 transition-colors ${
                      isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => 
                    `px-1 transition-colors ${
                      isActive ? "text-white border-b-2 border-b-emerald-300" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* phone view */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <FaBars className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-black/70 backdrop-blur-lg z-50 p-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <div className="flex flex-col space-y-6 mt-10">
          <NavLink 
            to="/" 
            onClick={() => setMenuOpen(false)} 
            className={({ isActive }) => 
              `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            onClick={() => setMenuOpen(false)} 
            className={({ isActive }) => 
              `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            onClick={() => setMenuOpen(false)} 
            className={({ isActive }) => 
              `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
            }
          >
            Contact
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/saved-posts"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
                }
              >
                Saved Posts
              </NavLink>
              <button onClick={handleLogout} className="text-white text-left">
                Logout
              </button>
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `text-white font-semibold ${isActive ? "text-emerald-400" : ""}`
                }
              >
                {user.name}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `text-white ${isActive ? "font-semibold text-emerald-400" : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;