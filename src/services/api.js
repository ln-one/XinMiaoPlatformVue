import axios from 'axios';

const API_BASE_URL = 'http://localhost:8087/api/auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 允许跨域携带 cookie
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 请求拦截器：跳过 /login 请求，不为其附加 token；其他请求正常附加 token
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
  // 注册接口
  register(userData) {
    return apiClient.post('/register', userData);
  },

  // 登录接口
  login(credentials) {
    return apiClient.post('/login', credentials);
  },

  // 密码找回接口
  resetPassword(passwordData) {
    return apiClient.post('/password/reset', passwordData);
  },

  // 获取个人信息
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