<template>
  <div class="form-container" role="form">
    <h2 class="form-title">
      <i class="fas fa-sign-in-alt"></i>
      登录账号
    </h2>
    <p class="form-subtitle">欢迎回来！请输入您的账号信息</p>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="identifier" class="form-label">
          <i class="fas fa-envelope"></i>
          邮箱账号
        </label>
        <div class="input-wrapper">
          <input
            v-model="credentials.useridcardOrEmail"
            type="email"
            id="identifier"
            required
            class="form-input"
            placeholder="请输入注册时使用的邮箱"
            autocomplete="email"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="password" class="form-label">
          <i class="fas fa-lock"></i>
          登录密码
        </label>
        <div class="input-wrapper">
          <input
            v-model="credentials.password"
            type="password"
            id="password"
            required
            class="form-input"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>
      </div>
      
      <div class="form-help">
        <label class="remember-me">
          <input type="checkbox" v-model="rememberMe">
          <div class="custom-checkbox">
            <i class="fas fa-check"></i>
          </div>
          <span>记住我</span>
        </label>
        <a href="#" class="forgot-link" @click.prevent="goToForgotPassword">忘记密码？</a>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span class="button-content">
          <i class="fas fa-sign-in-alt"></i>
          <span>{{ isSubmitting ? '登录中...' : '立即登录' }}</span>
        </span>
        <div class="button-background"></div>
      </button>

      <div 
        v-if="error" 
        role="alert" 
        class="error-message"
      >
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </div>
    </form>

    <div class="form-footer">
      <span>还没有账号？</span>
      <a href="#" @click.prevent="goToRegister">立即注册</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        useridcardOrEmail: '',
        password: ''
      },
      error: '',
      isSubmitting: false
    };
  },
  
  methods: {
    async handleSubmit() {
      if (this.isSubmitting) return;
      
      this.isSubmitting = true;
      this.error = '';
      
      try {
        await this.$store.dispatch('auth/login', this.credentials);
        // 登录成功后始终跳转到首页
        this.$router.push('/home');
      } catch (err) {
        this.error = '登录失败,请检查您的账号和密码';
      } finally {
        this.isSubmitting = false;
      }
    },
    
    goToForgotPassword() {
      this.$parent.currentTab = 'forgot';
    },
    
    goToRegister() {
      this.$parent.currentTab = 'register';
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 100%;
  padding: 30px 0;
}

.form-title {
  color: var(--text-primary);
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.form-title i {
  color: var(--accent-color);
}

.form-subtitle {
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 35px;
  font-size: 16px;
}

.form-group {
  margin-bottom: 22px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-size: 15px;
}

.form-label i {
  color: var(--accent-color);
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.form-help {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.remember-me:hover {
  color: var(--accent-color);
}

.remember-me input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.custom-checkbox i {
  color: white;
  font-size: 12px;
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
  transition: all 0.2s ease;
}

.remember-me:hover .custom-checkbox {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.remember-me input[type="checkbox"]:checked + .custom-checkbox {
  background: var(--accent-color);
  border-color: var(--accent-color);
}

.remember-me input[type="checkbox"]:checked + .custom-checkbox i {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.submit-btn {
  position: relative;
  width: 100%;
  padding: 14px 30px;
  border: 2px solid var(--accent-color);
  border-radius: 8px;
  background: transparent;
  color: var(--accent-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 25px;
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: inherit;
  transition: color 0.3s ease;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-color);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(41, 234, 196, 0.2);
}

.submit-btn:hover .button-content {
  color: var(--bg-primary);
}

.submit-btn:hover .button-background {
  transform: translateX(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  border-radius: 8px;
  background: var(--error-light, rgba(245, 108, 108, 0.1));
  color: var(--error-color);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.form-footer a {
  color: var(--accent-color);
  text-decoration: none;
  margin-left: 5px;
  font-weight: 500;
}

@media (max-width: 480px) {
  .form-title {
    font-size: 24px;
  }
  
  .form-input {
    font-size: 16px;
    padding: 10px 14px;
  }
  
  .submit-btn {
    padding: 10px;
    font-size: 15px;
  }
}
</style>