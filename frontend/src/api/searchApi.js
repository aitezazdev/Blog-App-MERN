import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const searchPosts = async (data) => {
  const response = await axios.get(`${API}?query=${data}`);
  return response.data;
};
