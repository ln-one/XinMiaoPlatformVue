<template>
  <div class="home-container">
    <!-- 用户标签 -->
    <div class="user-tag">
      <i class="fas fa-user-graduate"></i>
      2023级软件工程-02班 张春冉
    </div>

    <!-- 页面标题 -->
    <div class="auth-header">
      <h1>欢迎使用新苗同学平台</h1>
      <div class="header-subtitle">
        一站式服务平台，助力新生快速适应大学生活，开启精彩校园之旅
      </div>
    </div>

    <!-- 功能模块网格 -->
    <div class="module-grid">
      <div v-for="module in modules" :key="module.title" class="module-card" @click="handleCardClick(module.title)">
        <div class="module-header">
          <div class="module-icon">
            <i :class="module.icon"></i>
          </div>
          <div class="module-title">{{ module.title }}</div>
        </div>
        <div class="module-content">
          <div class="module-description">
            {{ module.description }}
          </div>
          <div class="module-button-wrapper">
            <button class="module-button">
              进入功能 <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      © 2025 新苗同学平台 | 为新生打造的个性化校园服务平台
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'HomeView',
  data() {
    return {
      modules: [
        {
          icon: 'fas fa-user-circle',
          title: '个人信息管理',
          description: '完善个人资料、更新联系信息、管理账号'
        },
        {
          icon: 'fas fa-university',
          title: '入学前准备',
          description: '入学须知、办理流程、资料清单、宿舍安排'
        },
        {
          icon: 'fas fa-lightbulb',
          title: '个性化推荐',
          description: '基于兴趣和专业推荐的课程、社团、活动'
        },
        {
          icon: 'fas fa-trophy',
          title: '任务积分系统',
          description: '完成任务赚取积分，解锁校园权益'
        },
        {
          icon: 'fas fa-map-marked-alt',
          title: '校园导览',
          description: '交互式校园地图、重要地点导航、校园服务'
        },
        {
          icon: 'fas fa-comments',
          title: '新生社区',
          description: '与同届新生互动交流、提问解惑、分享经验'
        }
      ]
    }
  },
  methods: {
    handleCardClick(title) {
      if (title === '个人信息管理') {
        this.$router.push('/profile');
      } else if (title === '个性化推荐') {
        this.$router.push('/recommend');
      } else if (title === '任务积分系统') {
        this.$router.push('/task-points');
      } else if (title === '入学前准备') {
        this.$router.push('/preparation');
      } else {
        alert(`即将进入${title}功能...`);
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

:root {
  --primary-color: #2eb99e;
  --primary-light: #dcfaf4;
  --primary-dark: #1dc0a8;
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #888;
  --bg-color: #f8fbfe;
  --card-bg: #6cc49b;
  --border-radius: 10px;
  --card-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  --card-hover-shadow: 0 8px 25px rgba(41, 234, 196, 0.3);
  --button-hover-bg: #23d3b0;
  --card-gap: 20px;
  --module-icon: #5ac5bc;
  --transition: all 0.3s ease;
}

.home-container {
  max-width: 1200px;
  width: 100%;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 30px 40px 60px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #29eac4, #3bd9f5);
  z-index: 1;
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
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 700px;
  margin: 12px auto 0;
  line-height: 1.7;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.module-card {
  height: 260px; /* 固定高度 */
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: var(--transition);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px var(--accent-light);
  border-color: var(--accent-color);
}

.module-header {
  flex-shrink: 0; /* 防止头部压缩 */
  display: flex;
  align-items: center;
  padding: 25px;
  background: linear-gradient(90deg, var(--accent-light) 0%, rgba(59, 217, 245, 0.08) 100%);
  border-bottom: 1px solid var(--border-color);
}

.module-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 24px;
  box-shadow: 0 4px 10px var(--shadow-color);
  flex-shrink: 0;
}

.module-icon i {
  font-size: 24px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.module-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
}

.module-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px;
  min-height: 0; /* 重要：允许内容区域正确滚动 */
}

.module-description {
  flex: 1;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.module-button-wrapper {
  flex-shrink: 0; /* 防止按钮区域被压缩 */
  padding-top: 20px; /* 与描述文本的固定间距 */
  margin-top: auto; /* 将按钮推到底部 */
}

.module-button {
  align-self: flex-start;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  background: var(--accent-light);
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.module-button:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
  box-shadow: 0 6px 15px var(--accent-light);
}

.user-tag {
  position: absolute;
  top: 25px;
  right: 0;
  background: var(--accent-light);
  color: var(--accent-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  font-size: 15px;
  padding: 8px 22px 8px 30px;
  border-radius: 30px 0 0 30px;
}

.user-tag i {
  margin-right: 8px;
  font-size: 16px;
}

.footer {
  margin-top: 50px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

/* ================ 新增梯度响应式设计 ================ */

/* 高分辨率桌面：1440px */
@media (min-width: 1440px) {
  .home-container {
    max-width: 1400px;
    padding: 35px 50px 70px;
  }

  .auth-header h1 {
    font-size: 40px;
  }

  .header-subtitle {
    font-size: 19px;
    max-width: 750px;
  }

  .module-grid {
    gap: 25px;
  }

  .module-card {
    height: 260px;
  }

  .module-header {
    padding: 22px;
  }

  .module-icon {
    width: 48px;
    height: 48px;
    font-size: 23px;
  }

  .module-title {
    font-size: 21px;
  }

  .module-content {
    padding: 24px;
  }

  .module-description {
    font-size: 15.5px;
  }

  .user-tag {
    top: 30px;
    font-size: 16px;
    padding: 9px 25px 9px 32px;
  }
}

/* 高分辨率桌面：1600px */
@media (min-width: 1600px) {
  .home-container {
    max-width: 1500px;
    padding: 40px 55px 75px;
  }

  .auth-header h1 {
    font-size: 42px;
  }

  .header-subtitle {
    font-size: 19.5px;
    max-width: 800px;
  }

  .module-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
  }

  .module-card {
    height: 270px;
  }

  .module-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }

  .module-title {
    font-size: 22px;
  }

  .module-content {
    padding: 25px;
  }

  .module-description {
    font-size: 16px;
  }

  .module-button {
    padding: 10px 26px;
    font-size: 15.5px;
  }
}

/* 2K分辨率：1920px */
@media (min-width: 1920px) {
  .home-container {
    max-width: 1600px;
    padding: 45px 60px 80px;
  }

  .auth-header h1 {
    font-size: 46px;
  }

  .header-subtitle {
    font-size: 21px;
    max-width: 850px;
  }

  .module-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
  }

  .module-card {
    height: 280px;
  }

  .module-header {
    padding: 25px;
  }

  .module-icon {
    width: 54px;
    height: 54px;
    font-size: 25px;
  }

  .module-title {
    font-size: 23px;
  }

  .module-content {
    padding: 26px;
  }

  .module-description {
    font-size: 16.5px;
    margin-bottom: 22px;
  }

  .module-button {
    padding: 11px 28px;
    font-size: 16.5px;
  }

  .user-tag {
    top: 35px;
    font-size: 17px;
    padding: 10px 28px 10px 36px;
  }

  .footer {
    font-size: 15.5px;
    margin-top: 55px;
  }
}

/* 超高清分辨率：2560px */
@media (min-width: 2560px) {
  .home-container {
    max-width: 2000px;
    padding: 60px 80px 100px;
    border-radius: 14px;
  }

  .auth-header h1 {
    font-size: 56px;
    letter-spacing: 1.5px;
  }

  .header-subtitle {
    font-size: 24px;
    max-width: 1000px;
    line-height: 1.8;
  }

  .auth-header::after {
    width: 130px;
    height: 5px;
  }

  .module-grid {
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 35px;
    margin-top: 20px;
  }

  .module-card {
    height: 320px;
    border-radius: 12px;
  }

  .module-header {
    padding: 30px;
  }

  .module-icon {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }

  .module-title {
    font-size: 26px;
  }

  .module-content {
    padding: 30px;
  }

  .module-description {
    font-size: 18px;
    margin-bottom: 25px;
    line-height: 1.75;
  }

  .module-button {
    padding: 13px 32px;
    font-size: 18px;
    border-radius: 26px;
  }

  .user-tag {
    top: 40px;
    font-size: 19px;
    padding: 12px 34px 12px 42px;
    border-radius: 35px 0 0 35px;
  }

  .user-tag i {
    font-size: 18px;
  }

  .footer {
    font-size: 17px;
    margin-top: 65px;
    padding-top: 30px;
  }
}

/* ================ 现有响应式调整 ================ */
@media (max-width: 1200px) {
  .home-container {
    max-width: 1000px;
  }
}

@media (max-width: 900px) {
  .home-container {
    padding: 25px 30px 50px;
  }

  .auth-header h1 {
    font-size: 32px;
  }

  .header-subtitle {
    font-size: 17px;
    max-width: 600px;
  }

  .module-card {
    height: 230px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 22px 25px 40px;
    border-radius: 12px;
  }

  .auth-header h1 {
    font-size: 30px;
  }

  .header-subtitle {
    font-size: 16px;
    max-width: 550px;
  }

  .module-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .module-card {
    height: 240px;
  }
  
  .module-header {
    padding: 20px;
  }
  
  .module-icon {
    width: 46px;
    height: 46px;
    font-size: 22px;
  }
  
  .module-title {
    font-size: 20px;
  }
  
  .module-content {
    padding: 20px;
  }
  
  .module-description {
    font-size: 15px;
    -webkit-line-clamp: 2;
  }
  
  .module-button-wrapper {
    padding-top: 15px;
  }
  
  .module-button {
    padding: 10px 22px;
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .home-container {
    padding: 20px;
  }

  .module-grid {
    grid-template-columns: 1fr;
  }

  .auth-header h1 {
    font-size: 28px;
  }

  .auth-header::after {
    width: 80px;
  }

  .header-subtitle {
    font-size: 15px;
    max-width: 100%;
  }

  .module-card {
    height: 230px;
    max-width: 500px;
    margin: 0 auto;
  }

  .user-tag {
    position: relative;
    top: 0;
    right: 0;
    border-radius: 30px;
    margin: 0 auto 25px;
    width: fit-content;
    padding: 7px 25px;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 18px 15px 35px;
  }

  .auth-header h1 {
    font-size: 26px;
  }

  .auth-header::after {
    width: 70px;
  }

  .user-tag {
    font-size: 14px;
    padding: 6px 20px;
    margin-bottom: 20px;
  }

  .module-card {
    height: 220px;
  }

  .module-header {
    padding: 14px 18px;
  }

  .module-title {
    font-size: 18px;
  }

  .module-content {
    padding: 18px;
  }

  .module-button {
    padding: 8px 20px;
  }
}
</style>