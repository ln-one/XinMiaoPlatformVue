import axios from 'axios';

// API基础配置
const API_BASE_URL = 'http://localhost:8087/api/auth';

// axios实例配置:
// 1. 基础URL
// 2. 允许跨域携带cookie
// 3. 请求/响应数据类型
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 允许跨域携带 cookie
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 请求拦截器
// 功能:
// 1. 跳过登录请求的token
// 2. 为其他请求添加token认证
// 3. 统一处理请求头
apiClient.interceptors.request.use(
  config => {
    if (!config.url.includes('/login')) { // 如果不是登录接口
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      // 如果请求为 /login，则删除可能已存在的 Authorization 头
      delete config.headers.Authorization;
    }
    console.log('Request URL:', config.url, ', headers:', config.headers);
    return config;
  },
  error => Promise.reject(error)
);

export default {
  // API方法说明:

  // 用户注册
  // 参数: userData{uname, uemail, password, uidcard, uphone?}
  register(userData) {
    return apiClient.post('/register', userData);
  },

  // 用户登录
  // 参数: credentials{useridcardOrEmail, password}
  login(credentials) {
    return apiClient.post('/login', credentials);
  },

  // 密码找回接口
  resetPassword(passwordData) {
    return apiClient.post('/password/reset', passwordData);
  },

  // 获取用户信息
  // 参数: uid - 用户ID
  getProfile(uid) {
    const token = localStorage.getItem('token');
    return apiClient.get(`/profile/${uid}`, {
      headers: {
        Authorization: token ? `Bearer ${token.trim()}` : ''
      }
    });
  },

  // 更新个人信息
  updateProfile(uid, profileData) {
    const token = localStorage.getItem('token');
    return apiClient.put('/profile', profileData, {
      params: { uid },
      headers: {
        Authorization: token ? `Bearer ${token.trim()}` : ''
      }
    });
  },

  // 登出接口（根据文档）
  logout() {
    return apiClient.post('/logout');
  }
};