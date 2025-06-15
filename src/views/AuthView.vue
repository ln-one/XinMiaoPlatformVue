<template>
  <div class="auth-page-container">
    <!-- 用户标签 -->
    <div class="user-tag">
      <i class="fas fa-user-graduate"></i>
      2023级软件工程-02班 张春冉
    </div>

    <!-- 页面标题 -->
    <div class="auth-header animate-fade">
      <h1>新苗同学平台登录</h1>
      <div class="header-subtitle">
        一站式校园服务平台，连接你的学习和生活
      </div>
    </div>
    
    <!-- 标签页导航 -->
    <div class="auth-tabs">
      <button 
        :class="['tab-button', { active: currentTab === 'login' }]"
        @click="currentTab = 'login'"
      >
        <i class="fas fa-sign-in-alt"></i> 登录
      </button>
      <button 
        :class="['tab-button', { active: currentTab === 'register' }]"
        @click="currentTab = 'register'"
      >
        <i class="fas fa-user-plus"></i> 注册
      </button>
      <button 
        :class="['tab-button', { active: currentTab === 'forgot' }]"
        @click="currentTab = 'forgot'"
      >
        <i class="fas fa-key"></i> 忘记密码
      </button>
    </div>
    
    <!-- 表单区域 -->
    <div class="auth-card animate-up">
      <transition name="fade-scale" mode="out-in">
        <component :is="currentComponent" :key="currentTab"></component>
      </transition>
    </div>
    
    <!-- 页脚 -->
    <div class="footer">
      © 2025 新苗同学平台 | 为新生打造的个性化校园服务平台
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/Auth/LoginForm.vue';
import RegisterForm from '../components/Auth/RegisterForm.vue';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm.vue';

export default {
  components: {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm
  },
  
  data() {
    return {
      currentTab: 'login'
    };
  },
  
  computed: {
    currentComponent() {
      switch(this.currentTab) {
        case 'login': return 'LoginForm';
        case 'register': return 'RegisterForm';
        case 'forgot': return 'ForgotPasswordForm';
        default: return 'LoginForm';
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.auth-page-container {
  max-width: 1200px;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-duration) ease;
}

.auth-page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #29eac4, #3bd9f5);
  z-index: 1;
}

.user-tag {
  position: absolute;
  top: 25px;
  right: 0;
  background: linear-gradient(90deg, rgba(41, 234, 196, 0.1) 0%, rgba(41, 234, 196, 0.2) 100%);
  color: #138a78;
  font-size: 15px;
  padding: 8px 22px 8px 30px;
  border-radius: 30px 0 0 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.user-tag i {
  margin-right: 8px;
  font-size: 16px;
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
  color: var(--text-secondary);
  font-size: 18px;
  font-weight: 400;
  max-width: 700px;
  margin: 12px auto 0;
  line-height: 1.7;
}

.auth-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
  background: var(--bg-primary);
  box-shadow: 0 2px 10px var(--shadow-color);
}

.tab-button {
  color: var(--text-secondary);
  background: transparent;
  padding: 14px 30px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  border-radius: 50px;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.tab-button i {
  margin-right: 8px;
}

.tab-button.active {
  background: var(--accent-color);
  color: var(--bg-primary);
  box-shadow: 0 4px 10px rgba(47, 170, 123, 0.3);
}

.tab-button:hover:not(.active) {
  background: var(--accent-light);
}

.auth-card {
  width: 100%;
  max-width: 600px;
  background: var(--bg-primary);
  box-shadow: 0 4px 15px var(--shadow-color);
  padding: 40px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  transition: var(--transition);
}

.auth-card:hover {
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-3px);
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--accent-color), var(--accent-color));
}

.footer {
  margin-top: auto;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  padding-top: 25px;
}

/* 动画效果 */
.animate-fade {
  animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-up {
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
/* 普通电脑：1024px */
@media (min-width: 1024px) {
            .auth-page-container {
                max-width: 1200px;
                padding: 40px 50px;
            }
            
            .auth-header h1 {
                font-size: 44px;
            }
            
            .header-subtitle {
                font-size: 21px;
            }
            
            .auth-card {
                padding: 45px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 16px;
                font-size: 18px;
            }
            
            .form-group input {
                padding: 15px 17px;
                font-size: 17px;
            }
        }
        
        /* 高分辨率：1280px */
        @media (min-width: 1280px) {
            .auth-page-container {
                max-width: 1300px;
                padding: 45px 60px;
            }
            
            .auth-header {
                margin: 55px 0 35px;
            }
            
            .auth-header h1 {
                font-size: 46px;
            }
            
            .header-subtitle {
                font-size: 22px;
                max-width: 750px;
            }
            
            .auth-tabs {
                margin-bottom: 35px;
            }
            
            .tab-button {
                padding: 17px 38px;
                font-size: 19px;
            }
            
            .auth-card {
                max-width: 700px;
                padding: 50px;
            }
            
            .form-group input {
                padding: 17px 20px;
                font-size: 18px;
            }
            
            .user-tag {
                font-size: 17px;
                padding: 13px 30px 13px 40px;
            }
            
            .footer {
                font-size: 17px;
            }
        }
        
        /* 高分辨率电脑：1440px (2K) */
        @media (min-width: 1440px) {
            .auth-page-container {
                max-width: 1400px;
                padding: 50px 70px;
                min-height: 88vh;
            }
            
            .auth-header {
                margin: 60px 0 40px;
            }
            
            .auth-header h1 {
                font-size: 50px;
            }
            
            .header-subtitle {
                font-size: 24px;
                max-width: 800px;
                line-height: 1.8;
            }
            
            .auth-header::after {
                width: 140px;
                height: 6px;
            }
            
            .auth-tabs {
                margin-bottom: 40px;
                padding: 8px;
            }
            
            .tab-button {
                padding: 18px 40px;
                font-size: 20px;
            }
            
            .auth-card {
                max-width: 750px;
                padding: 55px;
            }
            
            .form-group label {
                font-size: 19px;
            }
            
            .form-group input {
                padding: 18px 22px;
                font-size: 18px;
                border-radius: 12px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 19px;
                font-size: 19px;
                border-radius: 12px;
            }
            
            .user-tag {
                top: 35px;
                right: 35px;
                font-size: 18px;
                padding: 15px 32px 15px 42px;
            }
            
            .footer {
                font-size: 18px;
            }
        }
        
        /* 高分辨率：1600px */
        @media (min-width: 1600px) {
            .auth-page-container {
                max-width: 1500px;
                padding: 55px 80px;
                min-height: 85vh;
            }
            
            .auth-header h1 {
                font-size: 52px;
            }
            
            .header-subtitle {
                font-size: 25px;
                max-width: 850px;
            }
            
            .tab-button {
                padding: 20px 42px;
                font-size: 21px;
            }
            
            .auth-card {
                max-width: 800px;
                padding: 60px;
            }
            
            .form-group label {
                font-size: 20px;
            }
            
            .form-group input {
                padding: 20px 24px;
                font-size: 19px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 20px;
                font-size: 20px;
            }
            
            .user-tag {
                font-size: 19px;
                padding: 16px 35px 16px 45px;
            }
            
            .footer {
                font-size: 19px;
            }
        }
        
        /* 全高清：1920px (Full HD) */
        @media (min-width: 1920px) {
            .auth-page-container {
                max-width: 1700px;
                padding: 60px 90px;
                min-height: 82vh;
            }
            
            .auth-header {
                margin: 70px 0 45px;
            }
            
            .auth-header h1 {
                font-size: 56px;
            }
            
            .header-subtitle {
                font-size: 26px;
                max-width: 900px;
            }
            
            .auth-tabs {
                padding: 10px;
            }
            
            .tab-button {
                padding: 22px 46px;
                font-size: 23px;
            }
            
            .auth-card {
                max-width: 850px;
                padding: 65px;
            }
            
            .form-group label {
                font-size: 22px;
            }
            
            .form-group input {
                padding: 22px 26px;
                font-size: 21px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 22px;
                font-size: 22px;
            }
            
            .user-tag {
                top: 40px;
                right: 40px;
                font-size: 21px;
                padding: 18px 38px 18px 48px;
            }
            
            .footer {
                font-size: 20px;
            }
        }
        
        /* 超高清：2560px (4K) */
        @media (min-width: 2560px) {
            .auth-page-container {
                max-width: 2000px;
                padding: 80px 120px;
                min-height: 80vh;
                border-radius: 20px;
            }
            
            .auth-page-container::before,
            .auth-card::before {
                height: 10px;
            }
            
            .auth-header {
                margin: 80px 0 55px;
            }
            
            .auth-header h1 {
                font-size: 72px;
                margin: 40px 0 20px;
            }
            
            .header-subtitle {
                font-size: 32px;
                max-width: 1000px;
                line-height: 1.9;
            }
            
            .auth-header::after {
                width: 180px;
                height: 8px;
            }
            
            .auth-tabs {
                margin-bottom: 50px;
                padding: 12px;
                border-radius: 60px;
            }
            
            .tab-button {
                padding: 26px 52px;
                font-size: 28px;
                border-radius: 60px;
            }
            
            .auth-card {
                max-width: 1000px;
                padding: 80px;
                border-radius: 20px;
            }
            
            .form-group {
                margin-bottom: 35px;
            }
            
            .form-group label {
                font-size: 28px;
                margin-bottom: 15px;
            }
            
            .form-group input {
                padding: 28px 32px;
                font-size: 26px;
                border-radius: 16px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 30px;
                font-size: 28px;
                border-radius: 16px;
                margin-top: 20px;
            }
            
            .error-message {
                font-size: 25px;
                padding: 18px;
                border-radius: 12px;
            }
            
            .user-tag {
                top: 50px;
                right: 50px;
                font-size: 28px;
                padding: 22px 46px 22px 58px;
                border-radius: 45px 0 0 45px;
            }
            
            .user-tag i {
                font-size: 26px;
                margin-right: 14px;
            }
            
            .footer {
                font-size: 25px;
                padding-top: 35px;
            }
            
            .design-credit {
                margin-top: 12px;
                font-size: 21px;
            }
        }
        
        /* ===================== 移动端响应式设计 ===================== */
        
        @media (max-width: 900px) {
            .auth-page-container {
                padding: 35px 30px;
            }
            
            .auth-header h1 {
                font-size: 38px;
            }
            
            .header-subtitle {
                font-size: 18px;
            }
            
            .auth-card {
                padding: 40px 30px;
            }
        }
        
        @media (max-width: 768px) {
            .auth-page-container {
                padding: 30px 25px;
            }
            
            .auth-header {
                margin: 40px 0 20px;
                padding-bottom: 30px;
            }
            
            .auth-header h1 {
                font-size: 34px;
                margin: 25px 0 12px;
            }
            
            .header-subtitle {
                font-size: 17px;
            }
            
            .tab-button {
                padding: 14px 24px;
                font-size: 16px;
            }
        }
        
        @media (max-width: 600px) {
            .auth-page-container {
                padding: 25px 20px;
            }
            
            .auth-tabs {
                flex-direction: column;
                border-radius: var(--border-radius-lg);
                padding: 10px;
            }
            
            .tab-button {
                border-radius: 10px;
                width: 100%;
                justify-content: center;
                margin-bottom: 5px;
            }
            
            .auth-header {
                padding-bottom: 25px;
            }
            
            .auth-header h1 {
                font-size: 30px;
            }
            
            .header-subtitle {
                font-size: 16px;
            }
            
            .user-tag {
                position: relative;
                top: 0;
                right: 0;
                border-radius: 30px;
                margin: 0 auto 25px;
                width: fit-content;
                padding: 10px 25px;
                font-size: 15px;
            }
            
            .auth-card {
                padding: 35px 25px;
                margin-bottom: 30px;
            }
            
            .form-group label {
                font-size: 16px;
            }
            
            .form-group input {
                padding: 14px 16px;
                font-size: 15px;
            }
            
            .footer {
                font-size: 15px;
            }
        }
        
        @media (max-width: 480px) {
            .auth-page-container {
                padding: 20px 15px;
            }
            
            .auth-header {
                margin: 30px 0 15px;
                padding-bottom: 20px;
            }
            
            .auth-header h1 {
                font-size: 26px;
                margin: 20px 0 10px;
            }
            
            .header-subtitle {
                font-size: 15px;
            }
            
            .tab-button {
                padding: 12px;
                font-size: 14px;
            }
            
            .user-tag {
                padding: 8px 18px;
                font-size: 13px;
            }
            
            .auth-card {
                padding: 30px 20px;
            }
            
            .btn-reset, .btn-login, .btn-register {
                padding: 15px;
                font-size: 16px;
            }
            
            .footer {
                font-size: 13px;
            }
        }
        
        @media (max-width: 375px) {
            .auth-header h1 {
                font-size: 24px;
            }
            
            .form-group input {
                padding: 13px 15px;
            }
        }
</style>