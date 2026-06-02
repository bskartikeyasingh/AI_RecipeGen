import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-recipe-backend-aect.onrender.com",
});

export default API;