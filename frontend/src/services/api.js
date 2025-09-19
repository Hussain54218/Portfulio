import axios from "axios";

const API = axios.create({
  baseURL: "https://portfulio-5.onrender.com/api", // مسیر سرور
});

// اضافه کردن توکن به هدر درخواست‌ها
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
