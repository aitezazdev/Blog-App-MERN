import axios from "axios";
import apiClient from "./client";

const API = "https://blog-app-mern-production.up.railway.app";

export const getPostComments = async (postId) => {
  const response = await axios.get(`${API}/comments/get-comments/${postId}`);
  return response.data;
};

export const createComment = async (postId, content) => {
  const response = await apiClient.post(`/comments/add-comment/${postId}`, {
    content,
  });
  return response.data;
};

export const updateComment = async (commentId, content) => {
  const response = await apiClient.put(`/comments/edit-comment/${commentId}`, {
    content,
  });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await apiClient.delete(
    `/comments/delete-comment/${commentId}`
  );
  return response.data;
};
