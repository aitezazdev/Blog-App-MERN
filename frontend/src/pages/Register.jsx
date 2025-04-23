import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/Slices/authSlice";
import { MdOutlineError, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    try {
      await dispatch(registerUser(data)).unwrap();
      setData({ name: "", email: "", password: "" });
      setErrors({});
      navigate("/");
      toast.success("Registration Successful");
    } catch (err) {
      setErrors((prev) => ({ ...prev, backend: err || "Registration failed" }));
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", backend: "" }));
  };

  return (
    <div className="w-full min-h-[92vh] flex items-center justify-center bg-black">
      <div className="w-[480px] px-6">
        <form onSubmit={handleSubmit} className="bg-neutral-900 shadow-xl rounded-xl px-8 pt-6 pb-10 border border-neutral-800 transition-all">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
            <p className="text-neutral-400">Sign up to get started</p>
          </div>

          {errors.backend && (
            <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 px-4 py-1 flex items-center rounded mb-6" role="alert">
              <MdOutlineError className="w-6 h-6 mr-4 text-red-500" />
              <span className="text-sm">{errors.backend}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-neutral-300 text-sm font-semibold mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-neutral-500" />
                </div>
                <input
                  onChange={handleChange} autoComplete="off"
                  value={data.name}
                  className="w-full pl-10 py-3 px-4 text-white bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="User Khan"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-neutral-300 text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="w-5 h-5 text-neutral-500" />
                </div>
                <input autoComplete="off"
                  onChange={handleChange}
                  value={data.email}
                  className="w-full pl-10 py-3 px-4 text-white bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-neutral-300 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="w-5 h-5 text-neutral-500" />
                </div>
                <input autoComplete="off"
                  onChange={handleChange}
                  value={data.password}
                  className="w-full pl-10 py-3 px-4 text-white bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg shadow text-black font-semibold transition-all disabled:opacity-60 bg-emerald-400 hover:bg-emerald-300 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              {loading ? (
                <span className="flex items-center">
                  <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
