<template>
  <div class="recommend-container" role="main">
    <!-- 跳过导航链接 -->
    <a href="#main-content" class="skip-link">
      跳转到主要内容
    </a>

    <!-- 页面标题 -->
    <div class="auth-header">
      <h1>
        <span class="welcome-text">欢迎，</span>
        <el-tooltip content="这是模拟数据" placement="right">
          <span class="user-name">张同学</span>
        </el-tooltip>
      </h1>
      <div class="header-subtitle">
        <span>基于你的兴趣推荐</span>
        <div class="tags">
          <el-tag size="small" effect="plain" type="success">计算机科学</el-tag>
          <el-tag size="small" effect="plain" type="warning">摄影爱好者</el-tag>
          <el-tag size="small" effect="plain" type="danger">运动达人</el-tag>
        </div>
      </div>
    </div>    <!-- 兴趣匹配度指示器 -->    <div class="main-header">
      <div class="welcome-banner">
        <div class="banner-content">
          <h2 class="banner-title">Hi, 张同学</h2>
          <p class="banner-subtitle">让我们发现更多适合你的精彩内容</p>
          <div class="search-box">
            <el-input
              placeholder="搜索感兴趣的内容..."
              prefix-icon="el-icon-search"
              v-model="searchQuery"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="banner-decoration">
          <i class="fas fa-shapes decoration-icon"></i>
        </div>
      </div>
      
      <div class="quick-stats">
        <div class="stat-card" v-for="(stat, index) in quickStats" :key="index">
          <div class="stat-icon" :class="stat.class">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- 左侧：兴趣分析面板 -->
      <div class="interest-dashboard">
        <div class="panel-header">
          <h3><i class="fas fa-chart-pie"></i> 兴趣分析</h3>
          <el-tooltip content="根据你的活动实时更新" placement="top">
            <i class="fas fa-info-circle"></i>
          </el-tooltip>
        </div>
        <div class="interest-chart">
          <el-progress type="dashboard" 
                      :percentage="interestMatch" 
                      :stroke-width="12"
                      :width="120"
                      color="#67C23A"
                      :format="format"
          ></el-progress>
        </div>
        <div class="interest-tags">
          <transition-group name="tag-fade">
            <el-tag v-for="(tag, index) in shuffledTags" 
                    :key="tag.name"
                    :type="tag.type"
                    effect="light"
                    class="interest-tag floating"
                    :style="{ 
                      animationDelay: index * 0.2 + 's',
                      animationDuration: 3 + Math.random() * 2 + 's'
                    }"
                    @click="handleTagClick(tag)">
              <i :class="tag.icon"></i>
              {{ tag.name }}
            </el-tag>
          </transition-group>
        </div>
      </div>

      <!-- 右侧：实时动态和统计 -->
      <div class="status-dashboard">
        <div class="status-header">
          <i class="fas fa-chart-line"></i>
          <span>实时推荐动态</span>
        </div>
        <div class="status-content">
          <div class="status-item" v-for="(stat, index) in realtimeStats" :key="index">
            <div class="stat-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="quick-actions">
          <el-button-group>
            <el-button type="primary" size="small" @click="refreshRecommendations">
              <i class="fas fa-sync-alt"></i> 刷新推荐
            </el-button>
            <el-button type="success" size="small" @click="showPreferences">
              <i class="fas fa-sliders-h"></i> 偏好设置
            </el-button>
          </el-button-group>
        </div>
      </div>

      <!-- 动态提示条 -->
      <div class="notification-bar" v-if="showPrompt">
        <el-alert
          :title="currentPrompt"
          type="info"
          show-icon
          :closable="true"
          @close="closePrompt">
          <i class="fas fa-lightbulb prompt-icon"></i>
        </el-alert>
      </div>
    </div>    <div id="main-content" class="recommendation-grid">
      <!-- 社团推荐卡片 -->      <el-card class="recommendation-card" role="article" shadow="hover">
        <div class="card-header">
          <i class="fas fa-users"></i>
          <h2>社团推荐</h2>
          <el-tooltip content="根据你的兴趣标签推荐" placement="top">
            <i class="fas fa-info-circle info-icon"></i>
          </el-tooltip>
        </div>
        <div class="card-content">          <div v-for="club in clubs" 
               :key="club.id" 
               class="recommendation-item" 
               :data-club-id="club.id"
               @click="showClubDetails(club.id)">
            <i :class="club.icon"></i>
            <div class="item-details">
              <h3>
                {{ club.name }}
                <el-tag size="mini" :type="club.match >= 90 ? 'success' : 'warning'">
                  {{ club.match }}% 匹配
                </el-tag>
              </h3>
              <p>{{ club.description }}</p>
              <div class="item-stats">
                <span><i class="fas fa-user-friends"></i> {{ club.members }} 位成员</span>
                <span><i class="fas fa-star"></i> {{ club.rating }} 分</span>
              </div>
              <div class="events-preview">
                <i class="fas fa-calendar-check"></i>
                <span>近期活动: {{ club.events[0] }}</span>
              </div>
            </div>
          </div>
          <el-button type="text" class="view-more" @click="viewMore('clubs')">
            查看更多推荐 <i class="fas fa-arrow-right"></i>
          </el-button>
        </div>
      </el-card>

      <!-- 课程建议卡片 -->      <el-card class="recommendation-card" role="article" shadow="hover">
        <div class="card-header">
          <i class="fas fa-book-reader"></i>
          <h2>课程建议</h2>
          <el-tooltip content="基于你的学习进度推荐" placement="top">
            <i class="fas fa-info-circle info-icon"></i>
          </el-tooltip>
        </div>
        <div class="card-content">
          <div class="recommendation-item" @click="showCourseDetails('web')">
            <i class="fas fa-code"></i>
            <div class="item-details">
              <h3>Web前端开发
                <el-tag size="mini" type="danger">热门</el-tag>
              </h3>
              <p>推荐课时：48学时</p>
              <el-progress :percentage="30" :format="() => '学习进度 30%'" class="progress-bar"></el-progress>
              <div class="course-info">
                <span><i class="fas fa-users"></i> 2025人在学</span>
                <span><i class="fas fa-clock"></i> 预计3周完成</span>
              </div>
            </div>
          </div>
          <div class="recommendation-item" @click="showCourseDetails('ai')">
            <i class="fas fa-robot"></i>
            <div class="item-details">
              <h3>人工智能导论
                <el-tag size="mini" type="warning">进阶</el-tag>
              </h3>
              <p>推荐课时：32学时</p>
              <el-progress :percentage="0" :format="() => '尚未开始'" class="progress-bar"></el-progress>
              <div class="course-info">
                <span><i class="fas fa-users"></i> 1856人在学</span>
                <span><i class="fas fa-clock"></i> 预计2周完成</span>
              </div>
            </div>
          </div>
          <el-button type="text" class="view-more" @click="viewMore('courses')">
            浏览更多课程 <i class="fas fa-arrow-right"></i>
          </el-button>
        </div>
      </el-card>

      <!-- 校园活动卡片 -->      <el-card class="recommendation-card" role="article" shadow="hover">
        <div class="card-header">
          <i class="fas fa-calendar-alt"></i>
          <h2>校园活动</h2>
        </div>
        <div class="card-content">
          <div class="recommendation-item">
            <i class="fas fa-microphone-alt"></i>
            <div class="item-details">
              <h3>校园歌手大赛</h3>
              <p>时间：2025/06/20 19:00</p>
            </div>
          </div>
          <div class="recommendation-item">
            <i class="fas fa-basketball-ball"></i>
            <div class="item-details">
              <h3>院系篮球联赛</h3>
              <p>时间：2025/06/25-07/10</p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 周边推荐卡片 -->
      <el-card class="recommendation-card" role="article" shadow="hover">
        <div class="card-header">
          <i class="fas fa-utensils"></i>
          <h2>周边推荐</h2>
        </div>
        <div class="card-content">
          <div class="recommendation-item">
            <i class="fas fa-hamburger"></i>
            <div class="item-details">
              <h3>学生食堂</h3>
              <p>特色：新式快餐、传统美食</p>
            </div>
          </div>
          <div class="recommendation-item">
            <i class="fas fa-coffee"></i>
            <div class="item-details">
              <h3>图书馆咖啡厅</h3>
              <p>环境：安静舒适，适合学习</p>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  data() {
    return {
      loading: false,
      activeNames: ['1'],
      interestMatch: 0,
      showPrompt: true,
      currentPromptIndex: 0,
      shuffleInterval: null,
      timelineView: 'day',
      searchQuery: '',
      quickStats: [
        {
          icon: 'fas fa-chart-line',
          value: '98%',
          label: '兴趣匹配度',
          class: 'success'
        },
        {
          icon: 'fas fa-users',
          value: '2.5k+',
          label: '同兴趣用户',
          class: 'primary'
        },
        {
          icon: 'fas fa-star',
          value: '4.9',
          label: '推荐评分',
          class: 'warning'
        },
        {
          icon: 'fas fa-trophy',
          value: '12',
          label: '获得成就',
          class: 'danger'
        }
      ],
      prompts: [
        '根据你的兴趣标签为你推荐相关社团...',
        '发现与你兴趣相投的同学...',
        '正在分析你的学习偏好...',
        '为你筛选最适合的课程...'
      ],
      realtimeStats: [
        { icon: 'fas fa-users', value: '2,536', label: '今日活跃用户' },
        { icon: 'fas fa-handshake', value: '86%', label: '推荐满意度' },
        { icon: 'fas fa-chart-line', value: '+15%', label: '兴趣匹配提升' },
        { icon: 'fas fa-award', value: '12个', label: '新增推荐成功' }
      ],
      activityHours: [
        { hour: 6, activity: 20 },
        { hour: 8, activity: 45 },
        { hour: 10, activity: 75 },
        { hour: 12, activity: 60 },
        { hour: 14, activity: 85 },
        { hour: 16, activity: 90 },
        { hour: 18, activity: 70 },
        { hour: 20, activity: 40 },
        { hour: 22, activity: 30 }
      ],
      interestTags: [
        { name: '摄影', icon: 'fas fa-camera', type: 'success', weight: 95 },
        { name: '编程', icon: 'fas fa-code', type: 'primary', weight: 88 },
        { name: '音乐', icon: 'fas fa-music', type: 'warning', weight: 75 },
        { name: '运动', icon: 'fas fa-running', type: 'danger', weight: 82 },
        { name: '美术', icon: 'fas fa-palette', type: 'info', weight: 70 }
      ],
      clubs: [
        {
          id: 'photography',
          name: '摄影协会',
          icon: 'fas fa-camera',
          description: '探索摄影艺术，记录校园美好时光',
          members: 128,
          rating: 4.9,
          match: 98,
          events: ['周末采风活动', '新生摄影大赛']
        },
        {
          id: 'drama',
          name: '戏剧社',
          icon: 'fas fa-theater-masks',
          description: '体验表演艺术，展现自我魅力',
          members: 64,
          rating: 4.7,
          match: 85,
          events: ['迎新晚会表演', '校园话剧比赛']
        }
      ],
      courses: [
        {
          id: 'web',
          name: 'Web前端开发',
          icon: 'fas fa-code',
          hours: 48,
          progress: 30,
          learners: 2025,
          weeks: 3,
          tag: { type: 'danger', text: '热门' }
        },
        {
          id: 'ai',
          name: '人工智能导论',
          icon: 'fas fa-robot',
          hours: 32,
          progress: 0,
          learners: 1856,
          weeks: 2,
          tag: { type: 'warning', text: '进阶' }
        }
      ]
    }  },
  computed: {
    shuffledTags() {
      return [...this.interestTags].sort(() => Math.random() - 0.5);
    },
    currentPrompt() {
      return this.prompts[this.currentPromptIndex];
    }
  },  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    startInterestAnimation() {
      let count = 0;
      const targetMatch = 85;
      const interval = setInterval(() => {
        if (count >= targetMatch) {
          clearInterval(interval);
        } else {
          count += 1;
          this.interestMatch = count;
        }
      }, 20);
    },
    refreshRecommendations() {
      this.$message({
        message: '正在刷新推荐内容...',
        type: 'info'
      });
      
      // 模拟刷新动画
      setTimeout(() => {
        this.$notify({
          title: '推荐已更新',
          message: '根据最新的活跃数据，为您更新了推荐内容',
          type: 'success'
        });
      }, 1500);
    },
    showPreferences() {
      this.$confirm('这是一个演示功能，实际项目中会打开偏好设置面板', '提示', {
        confirmButtonText: '我知道了',
        showCancelButton: false,
        type: 'info'
      });
    },
    isActiveHour(hour) {
      const currentHour = new Date().getHours();
      return hour === currentHour;
    },
    shufflePrompts() {
      this.shuffleInterval = setInterval(() => {
        this.currentPromptIndex = (this.currentPromptIndex + 1) % this.prompts.length;
      }, 3000);
    },
    handleTagClick(tag) {
      this.$notify({
        title: '兴趣标签',
        message: `与你的"${tag.name}"兴趣匹配度为${tag.weight}%`,
        type: tag.type,
        duration: 2000,
        position: 'bottom-right'
      });
    },
    closePrompt() {
      this.showPrompt = false;
    },
    showClubDetails(clubId) {
      const club = this.clubs.find(c => c.id === clubId);
      this.$notify({
        title: club.name,
        message: `近期活动：${club.events.join('、')}`,
        type: 'success',
        duration: 3000,
        offset: 50,
        showClose: true,
        position: 'bottom-right'
      });
      
      // 添加点击动画效果
      const element = document.querySelector(`[data-club-id="${clubId}"]`);
      if (element) {
        element.classList.add('click-effect');
        setTimeout(() => element.classList.remove('click-effect'), 300);
      }
    },
    showCourseDetails(courseId) {
      const course = this.courses.find(c => c.id === courseId);
      const h = this.$createElement;
      
      this.$notify({
        title: course.name,
        message: h('div', { class: 'course-preview' }, [
          h('div', { class: 'course-stats' }, [
            h('span', [h('i', { class: 'fas fa-clock' }), ` ${course.hours}学时`]),
            h('span', [h('i', { class: 'fas fa-users' }), ` ${course.learners}人在学`])
          ]),
          h('el-progress', {
            props: {
              percentage: course.progress,
              format: () => `进度 ${course.progress}%`,
              strokeWidth: 10
            }
          })
        ]),
        type: 'success',
        duration: 4000,
        offset: 50,
        showClose: true
      });
    },
    viewMore(section) {
      const messages = {
        clubs: '更多推荐社团正在计算中...',
        courses: '正在为您分析更多适合的课程...',
        events: '更多校园活动信息加载中...',
        places: '正在定位更多周边推荐...'
      };
      
      this.$message({
        message: messages[section],
        type: 'info',
        showClose: true,
        duration: 2000
      });
    },
    showEventDetails(eventId) {
      const events = {
        singer: {
          title: '校园歌手大赛',
          time: '2025/06/20 19:00',
          location: '大学生活动中心',
          participants: 128
        },
        basketball: {
          title: '院系篮球联赛',
          time: '2025/06/25-07/10',
          location: '体育馆',
          participants: 256
        }
      };
      
      const event = events[eventId];
      this.$notify({
        title: event.title,
        dangerouslyUseHTMLString: true,
        message: `
          <div class="event-details">
            <p><i class="fas fa-clock"></i> ${event.time}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p><i class="fas fa-users"></i> ${event.participants}人报名</p>
          </div>
        `,
        type: 'success',
        duration: 4000,
        offset: 50
      });
    }
  },
  mounted() {
    this.startInterestAnimation();
    this.shufflePrompts();
  },
  beforeDestroy() {
    if (this.shuffleInterval) {
      clearInterval(this.shuffleInterval);
    }
  }
}
</script>

<style scoped>
/* 主题变量 */
:root {
  /* 亮色主题 */
  --recommend-bg: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #303133;
  --text-secondary: #606266;
  --border-color: #EBEEF5;
  --hover-bg: rgba(64, 158, 255, 0.1);
  --active-bg: rgba(64, 158, 255, 0.2);
  --shadow-color: rgba(0, 0, 0, 0.1);
  --card-shadow: 0 4px 12px var(--shadow-color);
  --header-gradient: linear-gradient(135deg, #409EFF, #67C23A);
}

/* 深色主题 */
@media (prefers-color-scheme: dark) {
  :root {
    --recommend-bg: #1e1e1e;
    --card-bg: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #909399;
    --border-color: #4c4c4c;
    --hover-bg: rgba(64, 158, 255, 0.15);
    --active-bg: rgba(64, 158, 255, 0.25);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --card-shadow: 0 4px 12px var(--shadow-color);
    --header-gradient: linear-gradient(135deg, #336699, #4a9c5d);
  }

  .el-card {
    background-color: var(--card-bg) !important;
    border-color: var(--border-color) !important;
  }

  .el-button--text {
    color: var(--primary-color) !important;
  }

  .el-button--text:hover {
    color: var(--primary-color) !important;
    opacity: 0.8;
  }
}

/* 基础样式重置 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 
               Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 
               'Segoe UI Symbol', 'Noto Color Emoji';
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 主页面容器 */
.recommend-container {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--el-bg-color);
}

@media (max-width: 768px) {
  .recommend-container {
    padding: 1rem;
  }
  
  .banner-title {
    font-size: 1.5rem;
  }
  
  .banner-subtitle {
    font-size: 1rem;
  }
  
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 欢迎横幅 */
.main-header {
  margin-bottom: 2rem;
}

.welcome-banner {
  background: linear-gradient(135deg, var(--el-color-primary-light-7) 0%, var(--el-color-primary-light-9) 100%);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: var(--el-text-color-primary);
}

.banner-subtitle {
  font-size: 1.1rem;
  color: var(--el-text-color-regular);
  margin: 0 0 1.5rem;
}

.banner-decoration {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.1;
  font-size: 5rem;
  color: var(--el-color-primary);
}

/* 搜索框样式 */
.search-box {
  max-width: 400px;
}

.search-box .el-input {
  --el-input-bg-color: rgba(255, 255, 255, 0.15);
  --el-input-border-color: transparent;
  --el-input-text-color: white;
  --el-input-placeholder-color: rgba(255, 255, 255, 0.7);
}

.search-box .el-input:hover {
  --el-input-bg-color: rgba(255, 255, 255, 0.2);
}

.search-box .el-input__inner {
  border-radius: 24px;
  height: 48px;
  padding-left: 1.5rem;
}

.search-box .el-input__prefix {
  left: 1rem;
}

/* 快速统计卡片 */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.success { background: #67C23A; }
.stat-icon.primary { background: #409EFF; }
.stat-icon.warning { background: #E6A23C; }
.stat-icon.danger { background: #F56C6C; }

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

/* 浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(-15deg);
  }
  50% {
    transform: translateY(-20px) rotate(-5deg);
  }
}

/* 桌面端网格布局优化 */
@media (min-width: 1024px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .interest-dashboard, .status-dashboard {
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }

  .recommendation-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .activity-timeline {
    grid-column: 1 / -1;
  }
}

/* 超宽屏幕优化 */
@media (min-width: 1600px) {
  .recommend-container {
    padding: 3rem;
  }

  .quick-stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .recommendation-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 动画和过渡效果 */
.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* 优化滚动条 */
.recommend-container {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--bg-secondary);
}

.recommend-container::-webkit-scrollbar {
  width: 8px;
}

.recommend-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.recommend-container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 4px;
}

/* 阴影和深度效果 */
.recommendation-card {
  position: relative;
}

.recommendation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: -1;
}

.recommendation-card:hover::before {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* 标题样式优化 */
.auth-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  padding: clamp(1rem, 3vw, 2rem);
  background: var(--header-gradient);
  border-radius: 12px;
  color: white;
}

.auth-header h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: var(--text-secondary);
  font-weight: normal;
}

.user-name {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 2px;
  cursor: help;
}

.header-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  opacity: 0.9;
  margin-top: 1rem;
}

.header-subtitle span {
  display: block;
  margin-bottom: 1rem;
}

.header-subtitle .tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 auto;
  padding: 0.5rem 0;
}

.header-subtitle .tags .el-tag {
  margin: 0;
}

/* 确保标签内容垂直居中 */
.header-subtitle .tags .el-tag {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.header-subtitle .tags .el-tag:last-child {
  margin-right: 0;
}

/* 卡片样式优化 */
.recommendation-card {
  height: 100%;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--el-border-color-light);
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  
  i {
    font-size: 1.5rem;
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
    padding: 8px;
    border-radius: 8px;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--el-bg-color-page);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--el-text-color-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--el-text-color-secondary);
    margin: 0 0 0.75rem;
    line-height: 1.6;
  }
}

.item-stats, .course-info {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.stat-card {
  .stat-value {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
}

/* 点击动画效果 */
.click-effect {
  animation: clickPulse 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes clickPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
    background-color: rgba(64, 158, 255, 0.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 兴趣仪表盘样式 */
.interest-dashboard {
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.interest-chart {
  position: relative;
  padding: 1rem;
}

.dashboard-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.percentage {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: bold;
  color: var(--primary-color);
}

.label {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--text-secondary);
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  padding: 1rem;
}

.interest-tag {
  cursor: pointer;
  padding: 0.7rem 1.2rem;
  font-size: clamp(1.1rem, 2.2vw, 1.25rem);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  animation: tagFloat 3s ease-in-out infinite;
  font-weight: 500;
  border-width: 2px;
  letter-spacing: 0.02em;
}

.interest-tag i {
  font-size: 1.1em;
}

/* 动态提示框样式 */
.dynamic-prompt {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--card-shadow);
  animation: slideInPrompt 0.5s ease-out;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}

.prompt-icon {
  color: var(--primary-color);
  font-size: 1.2em;
  animation: pulse 2s infinite;
}

.prompt-text {
  flex: 1;
  color: var(--text-secondary);
}

.prompt-close {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.prompt-close:hover {
  opacity: 1;
}

/* 标签动画 */
@keyframes tagFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.tag-fade-enter-active, .tag-fade-leave-active {
  transition: all 0.5s ease;
}

.tag-fade-enter-from, .tag-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 提示框动画 */
@keyframes slideInPrompt {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 字体大小响应式优化 */
.recommendation-item h3 {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.4;
  margin-bottom: 0.8rem;
}

.recommendation-item p {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.6;
}

.item-stats span, .course-info span {
  font-size: clamp(0.9rem, 1.8vw, 1rem);
}

/* 新的布局样式 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

@media (min-width: 992px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* 状态面板样式 */
.status-dashboard {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.status-dashboard .status-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--el-border-color-light);
}

.status-dashboard .status-header i {
  font-size: 1.5rem;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  padding: 8px;
  border-radius: 8px;
}

.status-dashboard .status-header span {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.status-dashboard .status-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: var(--el-bg-color);
  transition: all 0.3s ease;
}

.status-dashboard .status-item:hover {
  transform: translateX(4px);
  background: var(--el-color-primary-light-9);
}

.status-dashboard .status-item .stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 1rem;
  background: var(--el-color-primary-light-8);
}

.status-dashboard .status-item .stat-icon i {
  font-size: 1.25rem;
  color: var(--el-color-primary);
}

.status-dashboard .status-item .stat-info .stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 0.25rem;
}

.status-dashboard .status-item .stat-info .stat-label {
  font-size: 0.95rem;
  color: var(--el-text-color-secondary);
}
</style>
