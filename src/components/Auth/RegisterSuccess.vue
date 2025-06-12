<template>
  <div class="register-container" role="main">
    <div class="success-card animate-in">
      <div class="success-icon-wrapper">
        <div class="success-icon">
          <i class="fas fa-user-check"></i>
        </div>
        <svg class="check-circle" viewBox="0 0 100 100">
          <circle class="check-circle-bg" cx="50" cy="50" r="46" />
          <circle class="check-circle-path" cx="50" cy="50" r="46" />
        </svg>
      </div>
      
      <div class="content-wrapper animate-up">
        <h2>注册成功！</h2>
        <p class="success-message">恭喜您成功注册新苗同学平台，开启您的校园之旅吧</p>
        
        <div class="tip-card animate-in" style="animation-delay: 0.3s">
          <div class="tip-header">
            <div class="tip-icon">
              <i class="fas fa-info-circle"></i>
            </div>
            <span>温馨提示</span>
          </div>
          <p class="tip-content">
            建议您先完善个人信息，这将帮助我们为您提供更好的服务体验
          </p>
        </div>
        
        <div class="button-group">
          <button class="primary-button animate-up" @click="navigateToProfile" style="animation-delay: 0.5s">
            <span class="button-content">
              <i class="fas fa-user-edit"></i>
              <span>完善个人信息</span>
            </span>
          </button>
          <button class="secondary-button animate-up" @click="navigateToHome" style="animation-delay: 0.6s">
            <span class="button-content">
              <i class="fas fa-home"></i>
              <span>进入首页</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToProfile() {
      // 先跳转到首页，再跳转到个人信息页
      this.$router.push('/home').then(() => {
        setTimeout(() => {
          this.$router.push('/profile');
        }, 500);
      });
    },
    navigateToHome() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
}

.success-card {
  width: 100%;
  max-width: 500px;
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 15px var(--shadow-color);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.success-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 35px;
}

.success-icon {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: iconPop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.success-icon i {
  color: white;
  font-size: 40px;
}

.check-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 3;
}

.check-circle-bg {
  stroke: var(--accent-light);
}

.check-circle-path {
  stroke: var(--accent-color);
  stroke-dasharray: 290;
  stroke-dashoffset: 290;
  animation: circleDraw 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards;
}

h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 15px;
  font-size: 28px;
}

.success-message {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.primary-button,
.secondary-button {
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 14px 20px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button {
  background: var(--accent-color);
  color: var(--bg-primary);
  border: none;
}

.secondary-button {
  background: var(--bg-primary);
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@keyframes iconPop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes circleDraw {
  to {
    stroke-dashoffset: 0;
  }
}

.tip-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 25px;
  margin: 35px 0;
}

.tip-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.tip-icon {
  width: 32px;
  height: 32px;
  background: var(--accent-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.tip-icon i {
  font-size: 15px;
  color: var(--accent-color);
}

.tip-content {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .button-group {
    flex-direction: column;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
    padding: 12px 16px;
  }
}
</style>
