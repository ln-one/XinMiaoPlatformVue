// 在actions的updateProfile方法中添加请求拦截
async updateProfile({ commit, state }, profileData) {
  commit('CLEAR_ERROR');

  try {
    const uid = state.user.uid;
    if (!uid) throw new Error('用户ID未提供');

    // 添加请求拦截器
    const response = await api.updateProfile(uid, profileData);
    
    // 更新状态中的用户信息
    commit('UPDATE_USER_PROFILE', profileData);

    return response;
  } catch (error) {
    // 错误处理逻辑保持不变...
  }
}