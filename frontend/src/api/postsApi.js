import axios from "axios";
import apiClient from "./client";

const API = import.meta.env.VITE_API_URL;

export const getPosts = async () => {
  const response = await axios.get(`${API}/posts/all-posts`);
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios.get(`${API}/posts/post/${postId}`);
  
  return response.data;
};

export const getPostsByUser = async (userId) => {
  const response = await axios.get(`/posts/posts-by-author/${userId}`);
  return response.data;
};

export const createPost = async (formData) => {
  const response = await apiClient.post("/posts/create-post", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updatePost = async (postId, formData) => {
  const response = await apiClient.put(`/posts/update-post/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const deletePost = async (postId) => {
  const response = await apiClient.delete(`/posts/delete-post/${postId}`);
  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await apiClient.post(`/likes/toggle-like/${postId}`);
  return response.data;
};

export const togglePostSave = async (postId) => {
  const response = await apiClient.post(`/saves/toggle-save/${postId}`);
  return response.data;
};

export const getSavedPosts = async () => {
  const response = await apiClient.get("/saves/saved");
  return response.data;
};
