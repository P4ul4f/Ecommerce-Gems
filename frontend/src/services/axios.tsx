// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-gemstone.vercel.app", 
});

export default api;
