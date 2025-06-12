// 认证模块状态管理
// 功能:
// 1. 用户状态管理
// 2. 认证状态维护
// 3. Token管理
// 4. 错误处理

import api from '../services/api';

export default {
  namespaced: true,

  // 状态定义
  state: {
    user: {
      // 用户基本信息
      uid: null,          // 用户ID  
      uname: '',         // 用户名
      uemail: '',        // 邮箱
      uphone: '',        // 手机号
      uregtime: '',      // 注册时间
      // 认证信息
      token: '',         // 访问令牌
      refreshToken: '',  // 刷新令牌
      expiresAt: 0      // 过期时间
    },
    isAuthenticated: false,
    error: null
  },

  // 同步状态修改
  mutations: {
    // 更新用户信息
    SET_USER(state, payload) {
      state.user = {
        ...state.user,
        ...payload
      };
    },

    // 更新用户个人资料
    UPDATE_USER_PROFILE(state, profileData) {
      state.user = {
        ...state.user,
        ...profileData
      };
    },

    // 设置认证状态
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },

    // 设置错误信息
    SET_ERROR(state, error) {
      state.error = error;
    },

    // 清除错误信息
    CLEAR_ERROR(state) {
      state.error = null;
    },

    // 重置用户信息
    RESET_USER(state) {
      state.user = {
        uid: null,
        uname: '',
        uemail: '',
        uphone: '',
        uregtime: '',
        uidcard: '',
        token: '',
        refreshToken: '',
        expiresAt: 0
      };
    }
  },

  // 异步操作处理
  actions: {
    // 注册流程
    async register({ commit, dispatch }, userData) {
      commit('CLEAR_ERROR');
      try {
        // 注册
        const response = await api.register(userData);

        // 注册成功后自动登录
        await dispatch('login', {
          useridcardOrEmail: userData.uemail,
          password: userData.password
        });

        return response;
      } catch (error) {
        const errorMsg = error.response?.data?.message || '注册失败';
        commit('SET_ERROR', errorMsg);
        throw error;
      }
    },

    // 登录流程
    async login({ commit }, credentials) {
      commit('CLEAR_ERROR');
      try {
        const response = await api.login(credentials);
        const authData = response.data;
        const token = authData.accessToken.trim();  // 修正 token 格式
        commit('SET_USER', {
          token: token,
          refreshToken: authData.refreshToken,
          expiresAt: authData.expiresAt,
          uid: authData.uid  // 保存用户ID
        });
        localStorage.setItem('token', token);
        commit('SET_AUTHENTICATED', true);
        return response;
      } catch (error) {
        const errorMsg = error.response?.data?.message || '登录失败';
        commit('SET_ERROR', errorMsg);
        throw error;
      }
    },

    async resetPassword({ commit }, passwordData) {
      commit('CLEAR_ERROR');

      try {
        const response = await api.resetPassword(passwordData);
        return response;
      } catch (error) {
        const errorMsg = error.response?.data?.message || '密码重置失败';
        commit('SET_ERROR', errorMsg);
        throw error;
      }
    },

    // 获取指定用户的详细信息
    async fetchProfile({ commit, state }) {
      commit('CLEAR_ERROR');

      try {
        const uid = state.user.uid;
        if (!uid) throw new Error('用户ID未提供');

        // 调用 API 获取用户信息
        const response = await api.getProfile(uid);
        const profileData = response.data;

        // 更新状态中的用户信息
        commit('UPDATE_USER_PROFILE', profileData);

        return response;
      } catch (error) {
        // 增强错误处理
        if (error.response?.status === 401) {
          commit('SET_ERROR', '会话已过期，请重新登录');
          return Promise.reject(new Error('会话已过期'));
        }

        if (error.response?.status === 404) {
          commit('SET_ERROR', '用户信息不存在');
        } else {
          commit('SET_ERROR', error.response?.data?.message || '获取个人信息失败');
        }

        return Promise.reject(error);
      }
    },
    async fetchCurrentUser({ commit }) {
      commit('CLEAR_ERROR');
      try {
        console.log('[AUTH] 开始获取当前用户信息');
        const response = await api.getCurrentUser();
        console.log('[AUTH] 用户信息响应:', response.data);

        commit('SET_USER', {
          ...response.data,
          token: localStorage.getItem('token') || ''
        });
        commit('SET_AUTHENTICATED', true);
        return response;
      } catch (error) {
        console.error('[AUTH] 获取用户信息失败:', error);
        commit('SET_ERROR', '获取用户信息失败');
        throw error;
      }
    },
    // 更新用户信息
    async updateProfile({ commit, state }, profileData) {
      commit('CLEAR_ERROR');

      try {
        const uid = state.user.uid;
        if (!uid) throw new Error('用户ID未提供');

        const response = await api.updateProfile(uid, profileData);

        // 更新状态中的用户信息
        commit('UPDATE_USER_PROFILE', profileData);

        return response;
      } catch (error) {
        const errorMsg = error.response?.data?.message || '更新个人信息失败';
        commit('SET_ERROR', errorMsg);
        throw error;
      }
    },

    logout({ commit }) {
      commit('RESET_USER');
      commit('SET_AUTHENTICATED', false);
      localStorage.removeItem('token');
    },

    // 应用启动时初始化用户状态
    initializeAuth({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_USER', { token });
        commit('SET_AUTHENTICATED', true);
        // 获取当前用户信息
        dispatch('fetchCurrentUser');
      }
    }
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    userId: state => state.user.uid,
    error: state => state.error,

    user: state => state.user
  }
};
