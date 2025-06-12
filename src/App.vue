<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <div class="theme-toggle-wrapper" role="complementary" aria-label="主题切换">
      <button 
        @click="toggleDarkMode" 
        class="theme-toggle"
        :title="isDarkMode ? '切换到日间模式' : '切换到夜间模式'"
        :aria-label="isDarkMode ? '切换到日间模式' : '切换到夜间模式'"
        aria-pressed="false"
      >
        <div class="toggle-icon-wrapper">
          <!-- 修改这里：夜间模式显示太阳图标，日间模式显示月亮图标 -->
          <i :class="['fas', isDarkMode ? 'fa-moon' : 'fa-sun']"></i>
        </div>
        <span class="toggle-text">{{ isDarkMode ? '夜间' : '日间' }}</span>
      </button>
    </div>
    <router-view></router-view>

    <div class="accessibility-badges">
      <!-- 无障碍化标志 -->
      <div class="badge accessibility">
        <i class="fas fa-universal-access"></i>
        <span class="badge-text">无障碍适配</span>
        <span class="badge-text-en">Accessibility</span>
      </div>
      <!-- 中英文标志 -->
      <div class="badge responsive">
        <i class="fas fa-tablet-alt"></i>
        <span class="badge-text">响应式设计</span>
        <span class="badge-text-en">Responsive</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false
    }
  },
  created() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    
    // 检查系统主题偏好
    if (!savedTheme) {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      this.updateFavicon();
    },

    updateFavicon() {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = this.isDarkMode ? '/dark.ico' : '/light.ico';
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = this.isDarkMode ? '/dark.ico' : '/light.ico';
        document.head.appendChild(newFavicon);
      }
    }
  },
  watch: {
    isDarkMode: {
      immediate: true,
      handler(newVal) {
        document.body.classList.toggle('dark-mode', newVal);
        this.$setElementTheme?.(newVal);
        this.updateFavicon();
      }
    }
  }
};
</script>

<style>
:root {
  /* 亮色主题基础变量 */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #eaeaea;
  --accent-color: #42b983;
  --accent-light: rgba(66, 185, 131, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.08);
  --error-color: #f56c6c;
  --success-color: #67c23a;

  /* 组件特定颜色 */
  --header-bg: #ffffff;
  --card-bg: #ffffff;
  --hover-bg: #f5f5f5;
  --input-bg: #ffffff;
  --input-text: #333333;
  --label-text: #666666;
  --icon-color: #42b983;
  --border-hover: #42b983;
  --button-primary: #42b983;
  --button-secondary: #f5f7fa;
  
  /* 动画过渡时间 */
  --transition-duration: 0.3s;
}

.dark-mode {
  /* 暗色主题基础变量 */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2c2c2c;
  --bg-tertiary: #363636;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --border-color: #3a3a3a;
  --accent-color: #5ccfb1;
  --accent-light: rgba(92, 207, 177, 0.15);
  --shadow-color: rgba(0, 0, 0, 0.3);
  --error-color: #ff6b6b;
  --success-color: #84cf6a;

  /* 组件特定颜色 */
  --header-bg: #242424;
  --card-bg: #2c2c2c;
  --hover-bg: #363636;
  --input-bg: #363636;
  --input-text: #ffffff;
  --label-text: #b3b3b3;
  --icon-color: #5ccfb1;
  --border-hover: #5ccfb1;
  --button-primary: #5ccfb1;
  --button-secondary: #363636;
}

/* 添加全局组件样式 */
.card {
  background-color: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.input {
  background-color: var(--input-bg);
  color: var(--input-text);
  border: 1px solid var(--border-color);
}

.input:focus {
  border-color: var(--border-hover);
  box-shadow: 0 0 0 2px var(--accent-light);
}

.label {
  color: var(--label-text);
}

.icon {
  color: var(--icon-color);
}

.button-primary {
  background-color: var(--button-primary);
  color: var(--bg-primary);
}

.button-secondary {
  background-color: var(--button-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

body {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: background-color var(--transition-duration) ease,
              color var(--transition-duration) ease;
}

.theme-toggle-wrapper {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.theme-toggle {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 30px;
  border: 2px solid var(--accent-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 15px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: all var(--transition-duration) ease;
}

.toggle-icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--accent-color);
  margin-right: 8px;
}

.toggle-icon-wrapper i {
  color: var(--bg-primary);
  font-size: 14px;
  transition: transform var(--transition-duration) ease;
}

.toggle-text {
  font-weight: 500;
  transition: color var(--transition-duration) ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
  background: var(--accent-color);
  color: var(--bg-primary);
}

.theme-toggle:hover .toggle-icon-wrapper {
  background: var(--bg-primary);
}

.theme-toggle:hover .toggle-icon-wrapper i {
  color: var(--accent-color);
  transform: rotate(180deg);
}

/* 无障碍焦点样式 */
.theme-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-light);
}

.theme-toggle:focus:not(:focus-visible) {
  box-shadow: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .theme-toggle {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .toggle-icon-wrapper {
    width: 20px;
    height: 20px;
  }
  
  .toggle-icon-wrapper i {
    font-size: 12px;
  }
}

/* 高对比度模式支持 */
@media (forced-colors: active) {
  .theme-toggle {
    border: 2px solid ButtonText;
  }
  
  .toggle-icon-wrapper {
    border: 1px solid ButtonText;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .toggle-icon-wrapper i,
  body {
    transition: none;
  }
}

/* Element UI 暗色主题覆盖 */
.dark-mode {
  --el-color-primary: var(--accent-color);
  --el-border-color: var(--border-color);
  --el-background-color: var(--bg-primary);
  --el-text-color-primary: var(--text-primary);
  --el-text-color-regular: var(--text-secondary);
}

.dark-mode .el-button,
.dark-mode .el-input__inner,
.dark-mode .el-dialog,
.dark-mode .el-card {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.dark-mode .el-dialog__title,
.dark-mode .el-form-item__label {
  color: var(--text-primary);
}

.dark-mode .el-input__inner:focus {
  border-color: var(--accent-color);
}

.dark-mode .el-button:hover {
  color: var(--accent-color);
  border-color: var(--accent-color);
  background-color: var(--bg-tertiary);
}

.dark-mode .el-button--primary {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--bg-primary);
}

.dark-mode .el-button--primary:hover {
  background-color: var(--button-primary);
  border-color: var(--button-primary);
  color: var(--bg-primary);
}

.accessibility-badges {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.badge {
  padding: 8px 16px;
  background: var(--bg-primary);
  border: 2px solid var(--accent-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: all 0.3s ease;
}

.badge i {
  font-size: 16px;
  color: var(--accent-color);
}

.badge-text,
.badge-text-en {
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.badge-text-en {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--accent-light);
  background: var(--accent-color);
  padding: 8px 20px;
}

.badge:hover i,
.badge:hover .badge-text,
.badge:hover .badge-text-en {
  color: var(--bg-primary);
}

.badge:hover .badge-text-en {
  opacity: 1;
  width: auto;
  margin-left: 4px;
}

.accessibility {
  background: linear-gradient(45deg, var(--accent-light) 0%, rgba(59, 217, 245, 0.1) 100%);
}

.responsive {
  background: linear-gradient(45deg, rgba(59, 217, 245, 0.1) 0%, var(--accent-light) 100%);
}

.badge.responsive i {
  transform: rotate(-90deg);
}

.badge.responsive:hover i {
  transform: rotate(0deg);
}

/* 响应式调整 */
@media (min-width: 1440px) {
  .badge {
    padding: 10px 20px;
  }
  
  .badge i {
    font-size: 18px;
  }
  
  .badge-text,
  .badge-text-en {
    font-size: 15px;
  }
}

@media (min-width: 1920px) {
  .accessibility-badges {
    bottom: 30px;
    right: 30px;
    gap: 15px;
  }
  
  .badge {
    padding: 12px 24px;
  }
  
  .badge i {
    font-size: 20px;
  }
  
  .badge-text,
  .badge-text-en {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .accessibility-badges {
    bottom: 15px;
    right: 15px;
    flex-direction: column;
    gap: 8px;
  }
  
  .badge {
    padding: 6px 12px;
  }
  
  .badge i {
    font-size: 14px;
  }
  
  .badge-text {
    font-size: 13px;
  }
  
  .badge:hover {
    padding: 6px 14px;
  }
  
  .badge-text-en {
    display: none;
  }
}
</style>