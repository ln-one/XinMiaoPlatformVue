<template>
  <div class="form-container">
    <h2 class="form-title">
      <i class="fas fa-user-plus"></i>
      注册账号
    </h2>
    <p class="form-subtitle">创建您的账号，开启校园服务之旅</p>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username" class="form-label">
          <i class="fas fa-user"></i>
          用户名
        </label>
        <div class="input-wrapper">
          <input
            v-model="registrationData.uname"
            type="text"
            id="username"
            required
            class="form-input"
            placeholder="请输入您的用户名"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">
          <i class="fas fa-envelope"></i>
          邮箱账号
        </label>
        <div class="input-wrapper">
          <input
            v-model="registrationData.uemail"
            type="email"
            id="email"
            required
            class="form-input"
            placeholder="请输入您的邮箱地址"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="password" class="form-label">
          <i class="fas fa-lock"></i>
          密码
        </label>
        <div class="input-wrapper">
          <input
            v-model="registrationData.password"
            type="password"
            id="password"
            required
            class="form-input"
            placeholder="请设置您的登录密码"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="idcard" class="form-label">
          <i class="fas fa-id-card"></i>
          身份证号
        </label>
        <div class="input-wrapper">
          <input
            v-model="registrationData.uidcard"
            type="text"
            id="idcard"
            required
            class="form-input"
            placeholder="请输入您的身份证号"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="phone" class="form-label">
          <i class="fas fa-phone"></i>
          手机号码
        </label>
        <div class="input-wrapper">
          <input
            v-model="registrationData.uphone"
            type="tel"
            id="phone"
            class="form-input"
            placeholder="请输入您的手机号码（选填）"
          />
        </div>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span class="button-content">
          <i class="fas fa-user-plus"></i>
          <span>{{ isSubmitting ? '注册中...' : '立即注册' }}</span>
        </span>
        <div class="button-background"></div>
      </button>
      
      <div v-if="error" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registrationData: {
        uname: '',
        password: '',
        uemail: '',
        uphone: '',
        uidcard: ''
      },
      error: '',
      isSubmitting: false
    };
  },
  
  methods: {
    handleSubmit() {
      this.error = '';
      this.isSubmitting = true;
      this.$store.dispatch('auth/register', this.registrationData)
        .then(() => {
          // 修改这里：注册成功后跳转到注册成功页面
          this.$router.push('/register-success');
        })
        .catch(() => {
          this.error = '注册失败，请检查信息后重试';
        })
        .finally(() => {
          this.isSubmitting = false;
        });
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

.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

h2 {
  color: var(--text-primary);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-secondary);
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg);
  color: var(--input-text);
  transition: all var(--transition-duration) ease;
}

input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-light);
  outline: none;
}

.btn-register {
  width: 100%;
  padding: 10px;
  background-color: var(--accent-color);
  color: var(--bg-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-duration) ease;
}

.btn-register:hover {
  background-color: var(--button-primary);
  transform: translateY(-1px);
}

.error-message {
  color: var(--error-color);
  margin-top: 10px;
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

/* 响应式调整 */
@media (max-width: 480px) {
  .submit-btn {
    padding: 12px 25px;
    font-size: 15px;
  }
}
</style>