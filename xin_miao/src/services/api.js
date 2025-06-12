import axios from 'axios';

const API_BASE_URL = 'http://localhost:8087/api/auth';

export default {
  // 获取个人信息（根据文档）
  getProfile(uid) {
    return axios.get(`${API_BASE_URL}/profile/${uid}`, { 
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        // 添加缺失的请求头
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // 显式启用凭据传递
      withCredentials: true
    }).catch(error => {
      // 增强错误处理逻辑保持不变...
    });
  },

  // 更新个人信息（使用路径参数）
  updateProfile(uid, profileData) {
    return axios.put(
      `${API_BASE_URL}/profile/${uid}`, // 改为路径参数
      profileData, // 请求体直接传递数据
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    );
  }
};