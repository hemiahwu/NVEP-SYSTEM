import axios from "axios";
/**
 * axios封装
 */

// 配置统一的服务器地址 /users/login

// production
axios.defaults.baseURL = "/backend/8013/api";
// development
// axios.defaults.baseURL = "/api";

// 请求拦截 发送请求之前会执行
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// 响应拦截 客户端在接收到数据之前执行
axios.interceptors.response.use((response) => {
  return response;
});

export default axios;
