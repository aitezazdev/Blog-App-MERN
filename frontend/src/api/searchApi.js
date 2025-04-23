import axios from "axios";

const API = "http://localhost:3000/user-posts/search";

export const searchPosts = async (data) => {
  const response = await axios.get(`${API}?query=${data}`);
  console.log(response.data);
  return response.data;
};
