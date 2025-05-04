import axios from "axios";

const API = "https://blog-app-mern-production.up.railway.app/user-posts/search";

export const searchPosts = async (data) => {
  const response = await axios.get(`${API}?query=${data}`);
  return response.data;
};
