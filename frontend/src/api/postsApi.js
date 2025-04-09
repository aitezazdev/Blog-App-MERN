import axios from "axios";
import apiClient from "./client";

const API = "http://localhost:3000";

export const getPosts = async () => {
  const response = await axios.get(`${API}/posts/all-posts`);
  console.log(response.data);
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios.get(`${API}/posts/post/${postId}`);
  console.log(response.data);
  
  return response.data;
};

export const getPostsByUser = async (userId) => {
  const response = await axios.get(`/posts/posts-by-author/${userId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await apiClient.post("/posts/create-post", postData);
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await apiClient.put(`/posts/update-post/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await apiClient.delete(`/posts/delete-post/${postId}`);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await apiClient.post(`/likes/like/${postId}`);
  console.log(response.data);
  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await apiClient.post(`/likes/unlike/${postId}`);
  return response.data;
};

export const savePost = async (postId) => {
  const response = await apiClient.post(`/saves/save/${postId}`);
  return response.data;
};

export const unsavePost = async (postId) => {
  const response = await apiClient.post(`/saves/unsave/${postId}`);
  return response.data;
};

export const getSavedPosts = async () => {
  const response = await apiClient.get("/saves/saved");
  return response.data;
};

export const searchPosts = async (params) => {
  const response = await axios.get("/posts/search", { params });
  return response.data;
};
