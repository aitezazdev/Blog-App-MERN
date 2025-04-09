import axios from 'axios';
import apiClient from './client';

const API = 'http://localhost:3000';

export const getPostComments = async (postId) => {
  const response = await axios.get(`${API}/comments/get-comments/${postId}`);
  console.log(response.data);
  return response.data;
};

export const createComment = async (postId, content) => {
  const response = await apiClient.post(`/comments/add-comment/${postId}`, {content});
  console.log(response.data);
  return response.data;
};

export const updateComment = async (commentId, commentData) => {
  const response = await apiClient.put(`/comments/edit-comment/${commentId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await apiClient.delete(`/comments/delete-comment/${commentId}`);
  return response.data;
};