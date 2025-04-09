import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import SavedPosts from "./pages/SavedPosts";
import ProtectedRoute from "./Components/ProtectedRoute";
import PostDetails from "./Components/PostDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/saved-posts" element={<SavedPosts />} />
          </Route>

          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
