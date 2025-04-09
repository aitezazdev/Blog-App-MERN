import axios from 'axios';
import apiClient from './client';

const API = "http://localhost:3000";

export const login = async (userData) => {
  const response = await axios.post(`${API}/auth/login`, userData);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API}/auth/register`, userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await apiClient.get('/user/view-profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put('/user/update-profile', profileData);
  return response.data;
};

export const deleteUserAccount = async () => {
  const response = await apiClient.delete('/user/delete-profile');
  return response.data;
};