<template>
  <div class="home-container" role="main">
    <!-- 跳过导航链接 -->
    <a href="#main-content" class="skip-link">
      跳转到主要内容
    </a>

    <!-- 用户标签 -->
    <div class="user-tag">
      <i class="fas fa-award"></i>
      任务积分系统
    </div>

    <!-- 页面标题 -->
    <div class="auth-header">
      <h1>任务积分中心</h1>
      <div class="header-subtitle">
        完成任务获取积分，兑换奖励并获得成就
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div id="main-content" class="task-points-container">
      <!-- 积分概览卡片 -->
      <div class="profile-card">
        <div class="card-header">
          <i class="fas fa-coins"></i>
          <h2>积分概览</h2>
        </div>
        <div class="points-summary">
          <div class="points-item">
            <i class="fas fa-star"></i>
            <span class="points-value">1250</span>
            <span class="points-label">当前积分</span>
          </div>
          <div class="points-item">
            <i class="fas fa-trophy"></i>
            <span class="points-value">5</span>
            <span class="points-label">已获成就</span>
          </div>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="profile-card">
        <div class="card-header">
          <i class="fas fa-tasks"></i>
          <h2>新生任务</h2>
        </div>
        <div class="tasks-list">
          <div class="task-item" v-for="task in tasks" :key="task.id">
            <div class="task-status" :class="{ 'completed': task.completed }">
              <i :class="task.completed ? 'fas fa-check-circle' : 'far fa-circle'"></i>
            </div>
            <div class="task-content">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <div class="task-meta">
                <span class="task-points">
                  <i class="fas fa-coins"></i> {{ task.points }} 积分
                </span>
                <span class="task-deadline">
                  <i class="fas fa-clock"></i> {{ task.deadline }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 成就系统 -->
      <div class="profile-card">
        <div class="card-header">
          <i class="fas fa-medal"></i>
          <h2>成就墙</h2>
        </div>
        <div class="achievements-grid">
          <div class="achievement-item" v-for="achievement in achievements" :key="achievement.id">
            <i :class="achievement.icon"></i>
            <h3>{{ achievement.title }}</h3>
            <p>{{ achievement.description }}</p>
          </div>
        </div>
      </div>

      <!-- 积分商城 -->
      <div class="profile-card">
        <div class="card-header">
          <i class="fas fa-store"></i>
          <h2>积分商城</h2>
        </div>
        <div class="rewards-grid">
          <div class="reward-item" v-for="reward in rewards" :key="reward.id">
            <i :class="reward.icon"></i>
            <h3>{{ reward.title }}</h3>
            <p>{{ reward.description }}</p>
            <div class="reward-price">
              <i class="fas fa-coins"></i> {{ reward.points }} 积分
            </div>
            <button class="btn-exchange" :disabled="reward.points > 1250">
              兑换奖励
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'TaskPointsView',
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: '完成新生注册',
          description: '完成个人信息注册并验证邮箱',
          points: 100,
          deadline: '2025-09-01',
          completed: true
        },
        {
          id: 2,
          title: '参加入学教育',
          description: '参加新生入学教育课程',
          points: 150,
          deadline: '2025-09-15',
          completed: false
        },
        {
          id: 3,
          title: '加入学生社团',
          description: '选择并加入一个学生社团',
          points: 200,
          deadline: '2025-09-30',
          completed: false
        }
      ],
      achievements: [
        {
          id: 1,
          icon: 'fas fa-star',
          title: '新生达人',
          description: '完成所有新生任务'
        },
        {
          id: 2,
          icon: 'fas fa-users',
          title: '社交达人',
          description: '加入3个以上的社团'
        },
        {
          id: 3,
          icon: 'fas fa-book-reader',
          title: '学习先锋',
          description: '完成首月所有学习任务'
        }
      ],
      rewards: [
        {
          id: 1,
          icon: 'fas fa-coffee',
          title: '咖啡券',
          description: '校园咖啡店饮品兑换券',
          points: 500
        },
        {
          id: 2,
          icon: 'fas fa-ticket-alt',
          title: '电影票',
          description: '校园电影院观影券',
          points: 800
        },
        {
          id: 3,
          icon: 'fas fa-book',
          title: '图书券',
          description: '校园书店购书优惠券',
          points: 1000
        }
      ]
    }
  }
}
</script>

<style scoped>
.task-points-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.points-summary {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.points-item {
  text-align: center;
}

.points-value {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: var(--primary-color);
}

.points-label {
  color: var(--text-secondary);
}

.tasks-list {
  padding: 20px;
}

.task-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
}

.task-status {
  padding: 10px;
  color: var(--text-secondary);
}

.task-status.completed {
  color: var(--success-color);
}

.task-content {
  flex: 1;
  padding-left: 15px;
}

.task-content h3 {
  margin: 0;
  color: var(--text-primary);
}

.task-content p {
  margin: 10px 0;
  color: var(--text-secondary);
}

.task-meta {
  display: flex;
  gap: 20px;
  color: var(--text-secondary);
  font-size: 0.9em;
}

.achievements-grid,
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.achievement-item,
.reward-item {
  background: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.achievement-item i,
.reward-item i {
  font-size: 2em;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.achievement-item h3,
.reward-item h3 {
  margin: 10px 0;
  color: var(--text-primary);
}

.achievement-item p,
.reward-item p {
  color: var(--text-secondary);
  margin-bottom: 15px;
}

.reward-price {
  font-weight: bold;
  color: var(--primary-color);
  margin: 10px 0;
}

.btn-exchange {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-exchange:disabled {
  background: var(--disabled-color);
  cursor: not-allowed;
}

.btn-exchange:hover:not(:disabled) {
  background: var(--primary-color-dark);
}

/* 继承 ProfileView 的样式 */
.profile-card {
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--card-header-background);
}

.card-header i {
  font-size: 1.5em;
  margin-right: 10px;
  color: var(--primary-color);
}

.card-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2em;
}
</style>
