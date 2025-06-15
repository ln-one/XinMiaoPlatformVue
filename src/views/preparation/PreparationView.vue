<template>
  <div class="preparation-container" role="main">
    <!-- 用户标签 -->
    <div class="user-tag">
      <i class="fas fa-user-graduate"></i>
    </div>

    <!-- 页面标题 -->
    <div class="auth-header">
      <h1>入学前准备</h1>
      <div class="header-subtitle">
        为您提供全面的入学准备指南，让您轻松应对新生活
      </div>
    </div>

    <!-- 重构主要内容区域 -->
    <div class="preparation-content">
      <!-- 重构卡片布局 -->
      <div class="preparation-grid">
        <!-- 行李清单卡片 -->
        <div class="prep-card">
          <div class="card-header">
            <i class="fas fa-suitcase"></i>
            <h3>个性化行李清单生成器</h3>
          </div>
          <div class="card-content">
            <el-form :model="luggageForm" label-position="top" class="luggage-form">
              <div class="form-row">
                <el-form-item label="居住地气候">
                  <el-select v-model="luggageForm.climate" @change="generateLuggageList">
                    <el-option label="寒冷地区" value="cold" />
                    <el-option label="温带地区" value="moderate" />
                    <el-option label="炎热地区" value="hot" />
                  </el-select>
                </el-form-item>
                <el-form-item label="住宿类型">
                  <el-select v-model="luggageForm.dormType" @change="generateLuggageList">
                    <el-option label="校内宿舍" value="school" />
                    <el-option label="校外住宿" value="outside" />
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
            
            <div class="checklist-wrapper">
              <div class="category-tabs">
                <div 
                  v-for="category in state.luggageCategories" 
                  :key="category.id"
                  class="category-tab"
                  :class="{ active: currentCategory === category.id }"
                  @click="currentCategory = category.id"
                >
                  <i :class="category.icon"></i>
                  <span>{{ category.name }}</span>
                </div>
              </div>
              
              <div class="items-container">
                <el-checkbox-group v-model="checkedItems" class="items-grid">
                  <el-checkbox 
                    v-for="item in filteredItems" 
                    :key="item.id" 
                    :label="item.id"
                    class="item-checkbox"
                  >
                    <span class="item-name">{{ item.name }}</span>
                    <el-tag size="small" :type="item.essential ? 'danger' : 'info'">
                      {{ item.essential ? '必需' : '可选' }}
                    </el-tag>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <el-button type="primary" @click="downloadChecklist">
              <i class="fas fa-download"></i> 导出清单
            </el-button>
            <el-button @click="resetChecklist">
              <i class="fas fa-redo"></i> 重置
            </el-button>
          </div>
        </div>

        <!-- 交通路线规划卡片 -->
        <div class="prep-card">
          <div class="card-header">
            <i class="fas fa-map-marker-alt"></i>
            <h3>交通路线规划</h3>
          </div>
          <div class="card-content">
            <el-input
              v-model="departureCity"
              placeholder="请输入出发城市"
              class="city-input"
            >
              <template #prefix>
                <i class="fas fa-city"></i>
              </template>
            </el-input>
            
            <div class="route-timeline">
              <el-timeline>
                <el-timeline-item
                  v-for="(route, index) in state.recommendedRoutes"
                  :key="index"
                  :type="route.type"
                  :color="route.color"
                >
                  <div class="route-item">
                    <span class="route-time">{{ route.time }}</span>
                    <span class="route-content">{{ route.content }}</span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>

        <!-- 入学文件清单卡片 -->
        <div class="prep-card">
          <div class="card-header">
            <i class="fas fa-file-alt"></i>
            <h3>入学文件清单</h3>
          </div>
          <div class="card-content">
            <div class="documents-grid">
              <div 
                v-for="doc in state.documents" 
                :key="doc.name"
                class="document-item"
              >
                <div class="doc-icon">
                  <i class="fas fa-file-alt"></i>
                </div>
                <div class="doc-info">
                  <h4>{{ doc.name }}</h4>
                  <p>{{ doc.description }}</p>
                  <el-tag :type="doc.required ? 'danger' : 'info'" size="small">
                    {{ doc.required ? '必需' : '可选' }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 校园周边设施卡片 -->
        <div class="prep-card">
          <div class="card-header">
            <i class="fas fa-university"></i>
            <h3>校园周边设施</h3>
          </div>
          <div class="card-content">
            <el-tabs v-model="facilitiesTab" class="facilities-tabs">
              <el-tab-pane label="餐饮" name="food">
                <div class="facilities-grid">
                  <div 
                    v-for="item in state.facilities.food" 
                    :key="item.name"
                    class="facility-item"
                  >
                    <div class="facility-icon">
                      <i class="fas fa-utensils"></i>
                    </div>
                    <div class="facility-info">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.description }}</p>
                      <el-rate v-model="item.rating" disabled show-score></el-rate>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="购物" name="shopping">
                <div class="facilities-grid">
                  <div 
                    v-for="item in state.facilities.shopping" 
                    :key="item.name"
                    class="facility-item"
                  >
                    <div class="facility-icon">
                      <i class="fas fa-shopping-bag"></i>
                    </div>
                    <div class="facility-info">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.description }}</p>
                      <el-tag size="small" type="success">
                        距离 {{ item.distance }}m
                      </el-tag>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>

    <!-- 更新快捷操作栏 -->
    <div class="quick-actions" role="complementary" aria-label="快捷操作">
      <button 
        v-for="action in state.quickActions"
        :key="action.id"
        class="quick-action-item"
        @click="handleQuickAction(action.id)"
        :aria-label="action.title"
        :title="action.title"
      >
        <i :class="action.icon"></i>
        <span class="action-label">{{ action.name }}</span>
      </button>
    </div>

    <!-- 分享对话框 -->
    <el-dialog
      title="分享清单"
      v-model="shareDialogVisible"
      width="400px"
      custom-class="share-dialog"
    >
      <div class="share-options">
        <div 
          v-for="option in shareOptions"
          :key="option.id"
          class="share-option"
          @click="handleShare(option.id)"
        >
          <i :class="option.icon"></i>
          <span>{{ option.name }}</span>
        </div>
      </div>
    </el-dialog>

    <!-- 反馈提示 -->
    <div 
      v-if="feedbackMessage"
      :class="['feedback-message', feedbackType]"
      role="alert"
      aria-live="polite"
    >
      <i :class="feedbackIcon"></i>
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';

export default defineComponent({
  name: 'PreparationView',
  setup() {
    const activeNames = ref(['1']);
    const climate = ref('');
    const checkedItems = ref([]);
    const departureCity = ref('');
    const facilitiesTab = ref('food');
    const luggageForm = ref({
      climate: '',
      dormType: ''
    });
    const currentCategory = ref('clothing');
    const shareDialogVisible = ref(false);
    
    const feedbackMessage = ref('');
    const feedbackType = ref('');
    
    const state = reactive({
      suggestedItems: [
        '床上用品套装',
        '衣架',
        '台灯',
        '雨伞',
        '电脑',
        '文具用品',
        '生活用品',
        '个人证件'
      ],
      recommendedRoutes: [
        {
          content: '乘坐高铁/飞机到达目的地',
          time: '第一程',
          type: 'primary',
          color: '#0bbd87'
        },
        {
          content: '乘坐地铁2号线到学校附近站',
          time: '第二程',
          type: 'success',
          color: '#1989fa'
        },
        {
          content: '步行/打车到达学校',
          time: '第三程',
          type: 'warning',
          color: '#e6a23c'
        }
      ],
      documents: [
        {
          name: '录取通知书',
          required: true,
          description: '原件及复印件各一份'
        },
        {
          name: '身份证',
          required: true,
          description: '原件及复印件各一份'
        },
        {
          name: '高考成绩单',
          required: true,
          description: '原件及复印件各一份'
        },
        {
          name: '党/团关系材料',
          required: false,
          description: '如有'
        }
      ],
      facilities: {
        food: [
          {
            name: '学生食堂',
            description: '提供多样化的餐饮选择，价格实惠',
            rating: 4.5
          },
          {
            name: '咖啡厅',
            description: '安静的学习环境，提供饮品和简餐',
            rating: 4.0
          }
        ],
        shopping: [
          {
            name: '校园超市',
            description: '日常生活用品、文具等',
            distance: 100
          },
          {
            name: '商业街',
            description: '各类商铺、餐厅',
            distance: 500
          }
        ]
      },
      luggageCategories: [
        { id: 'clothing', name: '衣物', icon: 'fas fa-tshirt' },
        { id: 'electronics', name: '电子设备', icon: 'fas fa-laptop' },
        { id: 'documents', name: '证件文档', icon: 'fas fa-file-alt' },
        { id: 'daily', name: '日用品', icon: 'fas fa-shower' },
        { id: 'study', name: '学习用品', icon: 'fas fa-book' }
      ],
      quickActions: [
        { id: 'share', name: '分享', icon: 'fas fa-share-alt', title: '分享清单' },
        { id: 'print', name: '打印', icon: 'fas fa-print', title: '打印清单' },
        { id: 'help', name: '帮助', icon: 'fas fa-question-circle', title: '查看帮助' }
      ],
      shareOptions: [
        { id: 'wechat', name: '微信', icon: 'fab fa-weixin' },
        { id: 'qq', name: 'QQ', icon: 'fab fa-qq' },
        { id: 'link', name: '复制链接', icon: 'fas fa-link' }
      ]
    });

    const generateLuggageList = () => {
      // 根据气候和住宿类型生成行李清单
      const { climate, dormType } = luggageForm.value;
      let suggestedItems = [];

      // 根据气候添加物品
      if (climate === 'cold') {
        suggestedItems = [
          '羽绒服',
          '保暖内衣',
          '围巾手套',
          '厚毛衣'
        ];
      } else if (climate === 'hot') {
        suggestedItems = [
          '防晒霜',
          '遮阳帽',
          '短袖T恤',
          '凉鞋'
        ];
      }

      // 根据住宿类型添加物品
      if (dormType === 'school') {
        suggestedItems = [...suggestedItems,
          '床上四件套',
          '台灯',
          '衣架',
          '寝室用品'
        ];
      } else if (dormType === 'outside') {
        suggestedItems = [...suggestedItems,
          '电饭煲',
          '餐具',
          '生活电器',
          '清洁用品'
        ];
      }

      checkedItems.value = suggestedItems;
    };

    const downloadChecklist = () => {
      // 导出清单逻辑
      const checklist = checkedItems.value.join('\n');
      const blob = new Blob([checklist], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '行李清单.txt';
      a.click();
      URL.revokeObjectURL(url);
    };

    const resetChecklist = () => {
      checkedItems.value = [];
      luggageForm.value.climate = '';
      luggageForm.value.dormType = '';
    };

    const showFeedback = (message, type = 'success') => {
      feedbackMessage.value = message;
      feedbackType.value = type;
      setTimeout(() => {
        feedbackMessage.value = '';
      }, 3000);
    };

    const handleQuickAction = (actionId) => {
      // 将变量声明移到 switch 语句之前
      let isDark;
      
      switch(actionId) {
        case 'share':
          shareDialogVisible.value = true;
          break;
        case 'print':
          window.print();
          showFeedback('正在准备打印...', 'info');
          break;
        case 'help':
          showFeedback('帮助文档即将上线', 'info');
          break;
        case 'theme':
          // 切换主题模式
          document.body.classList.toggle('dark-mode');
          isDark = document.body.classList.contains('dark-mode');
          showFeedback(`已切换至${isDark ? '深色' : '浅色'}模式`);
          break;
      }
    };

    const handleShare = (type) => {
      // 实现分享功能
      this.$message({
        type: 'success',
        message: `已分享到${type}`
      });
      shareDialogVisible.value = false;
    };

    return {
      activeNames,
      climate,
      checkedItems,
      departureCity,
      facilitiesTab,
      luggageForm,
      currentCategory,
      shareDialogVisible,
      feedbackMessage,
      feedbackType,
      showFeedback,
      state,
      generateLuggageList,
      downloadChecklist,
      resetChecklist,
      handleQuickAction,
      handleShare,
      feedbackIcon: computed(() => ({
        'fas fa-check-circle': feedbackType.value === 'success',
        'fas fa-info-circle': feedbackType.value === 'info',
        'fas fa-exclamation-circle': feedbackType.value === 'error'
      }))
    };
  }
});
</script>

<style scoped>
/* 更新基础变量 */
:root {
  --primary-color: #42b983;
  --primary-light: #ecf8f3;
  --primary-dark: #2c9c6a;
  --accent-color: #3bd9f5;
  --accent-light: rgba(59, 217, 245, 0.1);
  --text-primary: #2c3e50;
  --text-secondary: #606266;
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #edf2f7;
  --border-color: #e4e7ed;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --error-color: #f56c6c;
  --info-color: #909399;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --line-height-base: 1.5;
  --card-padding: 25px;
}

/* 深色主题变量 */
.dark-mode {
  --primary-color: #42d392;
  --primary-light: #1a3228;
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
  --bg-primary: #1a1a1a;
  --bg-secondary: #242424;
  --bg-tertiary: #2a2a2a;
  --border-color: #383838;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

.preparation-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--bg-secondary);
  position: relative;
  transition: all 0.3s ease;
}

/* 更新页面标题样式 */
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
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
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

/* 重构主要内容区域样式 */
.preparation-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.preparation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  padding: 20px;
}

/* 卡片基础样式 */
.prep-card {
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 450px; /* 设置最小高度 */
}

.prep-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(41, 234, 196, 0.15);
}

.card-header {
  padding: 20px;
  background: rgba(41, 234, 196, 0.1);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-header i {
  font-size: 24px;
  color: var(--primary-color);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

/* 行李清单生成器样式优化 */
.luggage-form {
  margin-bottom: 25px;
}

.luggage-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.luggage-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.luggage-form :deep(.el-form-item__label) {
  font-size: var(--font-size-base);
  padding-bottom: 8px;
  color: var(--text-primary);
}

.luggage-form :deep(.el-select) {
  width: 100%;
  font-size: var(--font-size-base);
}

.checklist-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  min-height: 0; /* 重要：允许内容区域正确滚动 */
}

.category-tabs {
  background: transparent;
  margin-bottom: 15px;
  padding: 0;
  gap: 10px;
}

.category-tab {
  padding: 10px 20px;
  font-size: var(--font-size-base);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.category-tab i {
  font-size: 16px;
}

.category-tab.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(41, 234, 196, 0.2);
}

.items-container {
  flex: 1;
  background: transparent;
  padding: 10px 0;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.items-grid :deep(.el-checkbox) {
  margin-right: 0;
  margin-bottom: 0;
  height: auto;
}

.item-checkbox {
  margin: 0;
  padding: 15px;
  font-size: var(--font-size-base);
}

.item-checkbox:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.item-name {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.item-checkbox :deep(.el-tag) {
  margin-left: 8px;
}

.item-checkbox :deep(.el-checkbox__label) {
  font-size: var(--font-size-base);
  color: var(--text-primary);
}

/* 自定义滚动条样式 */
.items-container::-webkit-scrollbar {
  width: 6px;
}

.items-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.items-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.items-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* 交通路线规划样式 */
.route-timeline {
  margin-top: 15px;
  font-size: var(--font-size-base);
}

.route-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.route-time {
  font-weight: 500;
  color: var(--text-secondary);
}

/* 更新快捷操作栏样式 */
.quick-actions {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
}

.quick-action-item {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--bg-primary);
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.quick-action-item:hover {
  transform: translateY(-3px);
  background: var(--primary-color);
  color: var(--bg-primary);
  box-shadow: 0 6px 15px var(--primary-light);
}

.quick-action-item:active {
  transform: translateY(-1px);
}

.action-label {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.quick-action-item:hover .action-label {
  opacity: 1;
  transform: translateY(0);
}

/* 反馈消息样式 */
.feedback-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 30px;
  background: var(--bg-primary);
  box-shadow: 0 4px 12px var(--shadow-color);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

.feedback-message.success {
  color: var(--success-color);
  border: 1px solid var(--success-color);
}

.feedback-message.error {
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

.feedback-message.info {
  color: var(--info-color);
  border: 1px solid var(--info-color);
}

/* 动画效果 */
@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* 响应式设计优化 */
@media (max-width: 768px) {
  .preparation-container {
    padding: 20px;
  }

  .quick-actions {
    position: fixed;
    bottom: 20px;
    right: 20px;
    top: auto;
    transform: none;
    flex-direction: row;
    gap: 10px;
  }

  .quick-action-item {
    width: 45px;
    height: 45px;
  }

  .auth-header h1 {
    font-size: 28px;
  }

  .preparation-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 15px;
  }

  .luggage-form .form-row {
    grid-template-columns: 1fr;
  }

  .documents-grid,
  .facilities-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1440px) {
  :root {
    --font-size-base: 17px;
    --font-size-lg: 19px;
    --font-size-xl: 21px;
  }
}

/* 无障碍性增强 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: var(--bg-primary);
  padding: 8px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

/* 键盘导航焦点样式 */
:focus-visible {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}

/* 打印样式优化 */
@media print {
  .quick-actions,
  .feedback-message {
    display: none;
  }

  .preparation-container {
    padding: 0;
  }
}
</style>
