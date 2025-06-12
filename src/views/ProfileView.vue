<template>
  <div class="home-container" role="main">
    <!-- 跳过导航链接 -->
    <a href="#main-content" class="skip-link">
      跳转到主要内容
    </a>

    <!-- 用户标签 -->
    <div class="user-tag">
      <i class="fas fa-user-graduate"></i>
      2023级软件工程-02班 张春冉
    </div>

    <!-- 页面标题 -->
    <div class="auth-header">
      <h1>个人信息管理</h1>
      <div class="header-subtitle">
        完善个人资料、更新联系信息、管理账号设置，确保信息准确完整
      </div>
    </div>

    <!-- 全局错误提示 -->
    <div v-if="globalError" class="global-error">
      <i class="fas fa-exclamation-triangle"></i> {{ globalError }}
      <button class="retry-btn" @click="retryInitialization">
        <i class="fas fa-sync-alt"></i> 重新加载
      </button>
    </div>

    <!-- 个人信息卡片 -->
    <div id="main-content" class="profile-card" v-if="userData" role="article" aria-labelledby="profile-title">
      <div class="card-header">
        <div class="avatar" role="img" aria-label="用户头像">
          <i class="fas fa-user-circle"></i>
        </div>
        <h2 id="profile-title">{{ userData.uname }}的个人资料</h2>
      </div>
      
      <div class="profile-grid">
        <!-- 个人信息展示 -->
        <div class="info-section" role="region" aria-label="个人信息详情">
          <div class="info-item">
            <label><i class="fas fa-id-card"></i> 用户ID</label>
            <div class="info-value">{{ userData.uid }}</div>
          </div>
          <div class="info-item">
            <label><i class="fas fa-user"></i> 用户名</label>
            <div class="info-value">{{ userData.uname }}</div>
          </div>
          <div class="info-item">
            <label><i class="fas fa-envelope"></i> 邮箱</label>
            <div class="info-value">{{ userData.uemail }}</div>
          </div>
          <div class="info-item">
            <label><i class="fas fa-phone"></i> 手机号</label>
            <div class="info-value">{{ userData.uphone || '未设置' }}</div>
          </div>
          <div class="info-item">
            <label><i class="fas fa-calendar-alt"></i> 注册时间</label>
            <div class="info-value">{{ formatDate(userData.uregtime) }}</div>
          </div>
        </div>
        
        <!-- 个人信息编辑表单 -->
        <div class="form-section">
          <h3 id="edit-form-title"><i class="fas fa-edit"></i> 编辑个人信息</h3>
          
          <form @submit.prevent="updateProfile" role="form" aria-labelledby="edit-form-title">
            <div class="form-group">
              <label for="uname" id="uname-label">用户名</label>
              <input 
                type="text" 
                id="uname" 
                v-model="editData.uname" 
                required
                class="form-input"
                aria-labelledby="uname-label"
                aria-required="true"
                @keyup.enter="focusNext($event)"
              >
            </div>
            
            <div class="form-group">
              <label for="uphone" id="uphone-label">手机号</label>
              <input 
                type="tel" 
                id="uphone" 
                v-model="editData.uphone" 
                class="form-input"
                placeholder="请输入11位手机号"
                aria-labelledby="uphone-label"
                pattern="[0-9]{11}"
                @keyup.enter="focusNext($event)"
              >
            </div>
            
            <div class="form-group">
              <label for="uemail" id="uemail-label">邮箱</label>
              <input 
                type="email" 
                id="uemail" 
                v-model="editData.uemail" 
                required
                class="form-input"
                placeholder="example@email.com"
                aria-labelledby="uemail-label"
                aria-required="true"
                @keyup.enter="focusNext($event)"
              >
            </div>
            
            <div class="form-actions">
              <button 
                type="button" 
                class="cancel-btn"
                @click="resetForm"
                aria-label="取消更改"
              >
                <i class="fas fa-undo" aria-hidden="true"></i> 取消更改
              </button>
              <button 
                type="submit" 
                class="save-btn"
                aria-label="保存更改"
              >
                <i class="fas fa-save" aria-hidden="true"></i> 保存更改
              </button>
            </div>
            
            <!-- 操作反馈 -->
            <div 
              v-if="updateMessage" 
              :class="['status-message', updateStatus]"
              role="alert"
              aria-live="polite"
            >
              <i :class="updateStatusIcon" aria-hidden="true"></i> {{ updateMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div v-else-if="loading" class="loading-container">
      <i class="fas fa-spinner fa-spin"></i> 加载个人信息中...
    </div>
    
    <div v-else class="error-container">
      <i class="fas fa-exclamation-triangle"></i> 无法加载个人信息
      <button class="retry-btn" @click="retryInitialization">
        <i class="fas fa-sync-alt"></i> 重试
      </button>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      © 2025 新苗同学平台 | 为新生打造的个性化校园服务平台
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'ProfileView',
  data() {
    return {
      userData: null,
      editData: {
        uname: '',
        uphone: '',
        uemail: ''
      },
      loading: false,
      globalError: null,
      updateMessage: '',
      updateStatus: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['userId', 'isAuthenticated']),
    
    updateStatusIcon() {
      return this.updateStatus === 'success' 
        ? 'fas fa-check-circle' 
        : 'fas fa-times-circle';
    }
  },
  mounted() {
    // 增加用户认证检查
    if (!this.isAuthenticated) {
      this.handleInitError(new Error('请先登录'));
      return;
    }
    
    this.fetchProfile();
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async fetchProfile() {
      this.loading = true;
      try {
        const uid = this.userId;
        
        // 增加用户ID检查
        if (!uid) {
          await this.$store.dispatch('auth/fetchCurrentUser');
        }

        // 重新获取用户ID
        const currentUid = this.userId || uid;
        if (!currentUid) {
          throw new Error('无法获取用户信息，请重新登录');
        }

        // 调用 API 获取用户信息
        const response = await api.getProfile(currentUid);
        this.userData = response.data;
        
        // 初始化编辑表单数据
        this.editData = {
          uname: this.userData.uname || '',
          uphone: this.userData.uphone || '',
          uemail: this.userData.uemail || ''
        };
        
        this.globalError = null;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error) {
      // 增强错误类型识别
      if (error.message.includes('请先登录')) {
        this.handleInitError(error);
        return;
      }
      
      // 添加权限错误处理
      if (error.message.includes('权限不足') || error.message.includes('没有权限')) {
        this.handleProfileError('权限不足：' + error.message);
        return;
      }
      
      if (error.response?.status === 401) {
        this.handleProfileError('会话已过期，请重新登录');
        return;
      }
      
      if (error.response?.status === 500) {
        this.handleProfileError('服务器内部错误，请稍后再试');
        return;
      }
      
      // 网络错误或未知错误
      if (!navigator.onLine) {
        this.handleProfileError('网络连接异常，请检查网络');
      } else {
        this.handleProfileError('加载个人信息失败: ' + error.message);
      }
    },

    handleProfileError(message) {
      this.updateStatus = 'error';
      this.updateMessage = message;

      // 如果是会话过期，自动跳转到登录页面
      if (message.includes('会话已过期')) {
        setTimeout(() => {
          this.logout();
          this.$router.push('/login');
        }, 500);
      }
    },

    handleInitError(error) {
      // 统一初始化错误处理
      if (error.message.includes('请先登录')) {
        this.globalError = '请先登录系统';
        
        // 添加重定向信息，避免导航守卫循环
        setTimeout(() => {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          });
        }, 500);
      } else {
        this.globalError = '初始化失败: ' + error.message;
      }
    },

    async updateProfile() {
      this.loading = true;
      try {
        const uid = this.userId;
        if (!uid) throw new Error('用户ID未提供');
        
        // 修改为符合 API 规范的请求数据格式
        const profileData = {
          uname: this.editData.uname,
          uphone: this.editData.uphone || null, // 手机号可选
          uemail: this.editData.uemail
        };
        
        await api.updateProfile(uid, profileData);
        
        // 更新成功
        this.updateStatus = 'success';
        this.updateMessage = '个人信息已成功更新！';
        
        // 刷新数据
        setTimeout(() => {
          this.fetchProfile();
          this.updateMessage = '';
        }, 2000);
      } catch (error) {
        this.handleUpdateError(error);
      } finally {
        this.loading = false;
      }
    },
    
    handleUpdateError(error) {
      this.updateStatus = 'error';
      
      if (error.response?.status === 401) {
        this.updateMessage = '会话已过期，请重新登录';
        setTimeout(() => {
          this.logout();
          this.$router.push('/login');
        }, 500);
      } else if (error.response?.status === 403) { // 添加403处理
        this.updateMessage = '您没有权限执行此操作';
      } else if (error.response?.status === 500) {
        this.updateMessage = '服务器内部错误，请稍后再试';
      } else if (error.response?.status === 404) {
        this.updateMessage = '用户信息不存在';
      } else {
        this.updateMessage = error.response?.data?.message || error.message || '更新失败，请重试';
      }
    },
    
    retryInitialization() {
      this.globalError = null;
      this.updateMessage = '';
      this.fetchProfile();
    },
    
    resetForm() {
      if (this.userData) {
        this.editData = {
          uname: this.userData.uname || '',
          uphone: this.userData.uphone || '',
          uemail: this.userData.uemail || ''
        };
      }
      this.updateMessage = '';
    },
    
    formatDate(dateString) {
      if (!dateString) return '未设置';
      try {
        // 移除毫秒部分（如果存在）
        const normalizedDate = dateString.split('.')[0];
        const date = new Date(normalizedDate);
        
        // 检查是否为有效日期
        if (isNaN(date.getTime())) {
          return '无效日期';
        }
        
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch {
        return '无效日期';
      }
    },

    // 添加键盘导航方法
    focusNext(event) {
      const inputs = Array.from(document.querySelectorAll('.form-input'));
      const currentIndex = inputs.indexOf(event.target);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  }
};
</script>

<style scoped>
/* 更新基础样式以使用CSS变量 */
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.user-tag {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.user-tag i {
  margin-right: 8px;
  color: #3cb47e;
}

.auth-header {
  text-align: center;
  margin: 15px 0 40px;
  position: relative;
  padding-bottom: 25px;
}

.auth-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.auth-header h1 {
  font-size: 36px;
  color: var(--text-primary);
  font-weight: 700;
  margin: 25px 0 12px;
  background: linear-gradient(90deg, #29eac4, #3bd9f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.header-subtitle {
  font-size: 16px;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.global-error {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.global-error i {
  font-size: 24px;
  margin-bottom: 10px;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
}

.retry-btn i {
  font-size: 14px;
  margin-right: 5px;
  margin-bottom: 0;
}

.retry-btn:hover {
  background-color: #e64a4a;
}

.profile-card {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 6px 18px var(--shadow-color);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color); /* 修改边框颜色为变量 */
}

.card-header {
  display: flex;
  align-items: center;
  padding: 25px 30px;
  background: linear-gradient(90deg, var(--accent-light) 0%, rgba(59, 217, 245, 0.08) 100%);
  border-bottom: 1px solid var(--border-color);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 40px;
  color: var(--accent-color);
  box-shadow: 0 6px 12px rgba(66, 185, 131, 0.15);
}

.card-header h2 {
  font-size: 26px;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  padding: 30px;
}

.info-section {
  border-right: 1px solid var(--border-color);
  padding-right: 30px;
}

.info-item {
  margin-bottom: 25px;
}

.info-item label {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-weight: 500;
}

.info-item label i {
  margin-right: 10px;
  width: 20px;
  color: #48ca90;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
  background: var(--bg-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  min-height: 46px;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
}

.form-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.form-section h3 i {
  margin-right: 12px;
  color: #42b983;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  font-size: 15px;
  color: #555;
  margin-bottom: 10px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus {
  border-color: var(--accent-color);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.form-actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

/* 更新按钮样式 */
.cancel-btn, .save-btn {
  position: relative;
  overflow: hidden;
  flex: 1;
  padding: 14px 30px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cancel-btn {
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
}

.cancel-btn:hover {
  background: var(--bg-secondary);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.save-btn {
  background: var(--bg-primary);
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
}

.save-btn:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(41, 234, 196, 0.4);
}

.save-btn i, .cancel-btn i {
  margin-right: 8px;
  font-size: 16px;
  transition: transform 0.3s ease;
}

.save-btn:hover i, .cancel-btn:hover i {
  transform: translateX(-3px);
}

/* 添加按钮点击动画效果 */
.save-btn:active, .cancel-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 更新媒体查询中的按钮样式 */
@media (max-width: 600px) {
  .cancel-btn, .save-btn {
    padding: 12px 25px;
    font-size: 15px;
  }
}

@media (min-width: 1440px) {
  .cancel-btn, .save-btn {
    padding: 16px 35px;
    font-size: 17px;
  }
}

@media (min-width: 1920px) {
  .cancel-btn, .save-btn {
    padding: 18px 40px;
    font-size: 18px;
  }
}

@media (min-width: 2560px) {
  .cancel-btn, .save-btn {
    padding: 20px 45px;
    font-size: 20px;
  }
}

.status-message {
  margin-top: 25px;
  padding: 13px 16px;
  border-radius: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.success {
  background-color: var(--accent-light);
  color: var(--success-color);
  border: 1px solid var(--success-color);
}

.error {
  background-color: rgba(245, 108, 108, 0.1);
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

.status-message i {
  margin-right: 10px;
  font-size: 18px;
}

.loading-container, 
.error-container {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #7f8c8d;
  background: #f9fafb;
  border-radius: 12px;
  padding: 30px;
  margin: 30px 0;
}

.error-container {
  color: #f56c6c;
}

.loading-container i {
  font-size: 36px;
  margin-bottom: 20px;
  color: #42b983;
  animation: spin 1.5s linear infinite;
}

.error-container i {
  font-size: 36px;
  margin-bottom: 20px;
  color: #f56c6c;
}

.footer {
  margin-top: 40px;
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
}

/* 删除返回按钮样式 */
.back-button {
  display: none;
}

/* 响应式调整 */
@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .info-section {
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    padding-right: 0;
    padding-bottom: 25px;
    margin-bottom: 25px;
  }
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  
  .avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .form-input,
  .cancel-btn, 
  .save-btn {
    padding: 12px;
  }
}

/* 高分辨率响应式设计 */
/* 1440p */
@media (min-width: 1440px) {
  .home-container {
    max-width: 1400px;
    padding: 30px;
  }

  .auth-header h1 {
    font-size: 32px;
  }

  .header-subtitle {
    font-size: 18px;
    max-width: 700px;
  }

  .profile-card {
    max-width: 1100px;
  }

  .form-input {
    padding: 15px 18px;
    font-size: 16px;
  }

  .info-value {
    font-size: 17px;
    padding: 14px 18px;
  }
}

/* 1920p (2K) */
@media (min-width: 1920px) {
  .home-container {
    max-width: 1800px;
    padding: 40px;
  }

  .auth-header h1 {
    font-size: 36px;
  }

  .header-subtitle {
    font-size: 20px;
    max-width: 800px;
  }

  .profile-card {
    max-width: 1400px;
  }

  .card-header {
    padding: 30px 35px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    font-size: 50px;
  }

  .form-input {
    padding: 16px 20px;
    font-size: 17px;
  }

  .info-value {
    font-size: 18px;
    padding: 15px 20px;
  }

  .form-group label {
    font-size: 17px;
  }
}

/* 2160p (4K) */
@media (min-width: 2560px) {
  .home-container {
    max-width: 2200px;
    padding: 50px;
  }

  .auth-header h1 {
    font-size: 42px;
  }

  .header-subtitle {
    font-size: 24px;
    max-width: 1000px;
  }

  .profile-card {
    max-width: 1800px;
  }

  .card-header {
    padding: 35px 40px;
  }

  .avatar {
    width: 120px;
    height: 120px;
    font-size: 60px;
  }

  .card-header h2 {
    font-size: 32px;
  }

  .form-input {
    padding: 18px 22px;
    font-size: 19px;
    border-radius: 8px;
  }

  .info-value {
    font-size: 20px;
    padding: 16px 22px;
  }

  .form-group {
    margin-bottom: 30px;
  }

  .form-group label {
    font-size: 19px;
    margin-bottom: 12px;
  }

  .form-actions {
    margin-top: 40px;
    gap: 25px;
  }

  .cancel-btn, .save-btn {
    padding: 16px;
    font-size: 18px;
    border-radius: 8px;
  }

  .status-message {
    font-size: 17px;
    padding: 15px 20px;
  }

  .footer {
    margin-top: 50px;
    font-size: 16px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 添加无障碍样式 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #42b983;
  color: white;
  padding: 8px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

/* 键盘焦点样式 */
:focus {
  outline: 3px solid #42b983;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* 高对比度模式支持 */
@media (forced-colors: active) {
  .form-input:focus {
    outline: 3px solid ButtonText;
  }
  
  .save-btn,
  .cancel-btn {
    border: 1px solid ButtonText;
  }
}
</style>