<!-- ResetSuccess.vue (新组件) -->
<template>
  <div class="reset-container" role="main">
    <div class="success-card animate-in">
      <div class="success-icon-wrapper">
        <div class="success-icon">
          <i class="fas fa-check"></i>
        </div>
        <svg class="check-circle" viewBox="0 0 100 100">
          <circle class="check-circle-bg" cx="50" cy="50" r="46" />
          <circle class="check-circle-path" cx="50" cy="50" r="46" />
        </svg>
      </div>
      
      <div class="content-wrapper animate-up">
        <h2>密码重置成功！</h2>
        <p class="success-message">您的密码已成功更新，请使用新密码登录账户</p>
        
        <div class="tip-card animate-in" style="animation-delay: 0.3s">
          <div class="tip-header">
            <div class="tip-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <span>安全提示</span>
          </div>
          <p class="tip-content">
            请务必妥善保管您的新密码，建议定期更新以确保账户安全
          </p>
        </div>
        
        <button class="back-button animate-up" @click="navigateToLogin" style="animation-delay: 0.5s">
          <span class="button-content">
            <i class="fas fa-arrow-left"></i>
            <span>返回登录</span>
          </span>
          <div class="button-background"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToLogin() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.reset-container {
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

.success-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--accent-color), var(--accent-color));
}

.success-container {
  text-align: center;
}

.success-icon-wrapper {
  position: relative;
  width: 100px; /* 调整大小 */
  height: 100px;
  margin: 0 auto 35px; /* 增加底部间距 */
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
  font-size: 40px; /* 调整图标大小 */
  transform: scale(1.2); /* 微调图标大小 */
}

.check-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 3; /* 调整圆环粗细 */
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

.content-wrapper {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
}

.animate-up {
  opacity: 0;
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.tip-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 25px; /* 增加内边距 */
  margin: 35px 0; /* 调整外边距 */
  text-align: left;
  transform: translateY(20px);
  animation: cardSlideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

.tip-header {
  display: flex;
  align-items: center; /* 确保垂直居中 */
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.tip-icon {
  width: 32px; /* 稍微调小尺寸 */
  height: 32px;
  background: var(--accent-light);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.tip-icon i {
  font-size: 15px; /* 调整图标大小 */
  line-height: 1;
  color: var(--accent-color);
}

.tip-header span {
  font-weight: 600;
  color: var(--accent-color);
  font-size: 17px;
  line-height: 32px; /* 与图标容器高度一致 */
}

.back-button {
  position: relative;
  overflow: hidden;
  display: block; /* 改为块级元素 */
  width: fit-content; /* 适应内容宽度 */
  margin: 30px auto 0; /* 调整上边距并水平居中 */
  min-width: 160px;
  padding: 14px 30px;
  background: var(--bg-primary);
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(41, 234, 196, 0.4);
}

/* 动画效果 */
@keyframes slideIn {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
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

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes cardSlideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式调整 */
@media (min-width: 768px) {
  .success-card {
    padding: 50px;
  }
  
  h2 {
    font-size: 32px;
  }
  
  .success-message {
    font-size: 19px;
  }
  
  .tip-card {
    padding: 25px;
  }
  
  .back-button {
    padding: 16px 35px;
    font-size: 17px;
  }

  .success-icon-wrapper {
    width: 110px;
    height: 110px;
  }

  .success-icon i {
    font-size: 45px;
  }
}

@media (min-width: 1440px) {
  .reset-container {
    padding: 60px 40px;
  }

  .success-card {
    max-width: 600px;
    padding: 60px;
  }
  
  .success-icon-wrapper {
    width: 120px;
    height: 120px;
  }

  .success-icon i {
    font-size: 50px;
  }
  
  h2 {
    font-size: 36px;
  }
  
  .success-message {
    font-size: 20px;
    margin-bottom: 40px;
  }
  
  .tip-card {
    padding: 30px;
    margin: 50px 0;
  }
  
  .tip-header i {
    font-size: 22px;
  }
  
  .tip-header span {
    font-size: 20px;
  }
  
  .tip-content {
    font-size: 17px;
  }
  
  .back-button {
    padding: 18px 40px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .reset-container {
    padding: 20px;
  }

  .success-card {
    padding: 30px 20px;
  }

  .success-icon-wrapper {
    width: 90px;
    height: 90px;
    margin-bottom: 30px;
  }

  .success-icon i {
    font-size: 35px;
  }

  .tip-icon {
    width: 32px;
    height: 32px;
  }

  .tip-icon i {
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }

  .success-message {
    font-size: 16px;
  }
}
</style>