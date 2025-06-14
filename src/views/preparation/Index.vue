<template>
  <!-- 入学准备模块主容器 -->
  <div class="preparation-module">
    <!-- 顶部模块标题 -->
    <h2 class="module-title">入学前准备</h2>
    
    <!-- 子导航菜单 -->
    <nav class="sub-nav">
      <router-link
        v-for="link in filteredNavLinks"
        :key="link.to"
        :to="{ name: link.to }"
        class="nav-item"
        active-class="active"
        exact-active-class="exact-active"
      >
        <i v-if="link.icon" :class="['icon', link.icon]"></i>
        <span class="nav-text">{{ link.text }}</span>
        <span v-if="link.badge" class="badge">{{ link.badge }}</span>
      </router-link>
    </nav>

    <!-- 内容展示区 -->
    <main class="content-wrapper">
      <router-view v-slot="{ Component }">
        <!-- 缓存需要keepAlive的页面 -->
        <keep-alive>
          <component 
            :is="Component"
            v-if="$route.meta.keepAlive"
            :key="$route.name"
          />
        </keep-alive>
        <!-- 不缓存的常规页面 -->
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
          :key="$route.name"
        />
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PreparationLayout',
  data() {
    return {
      // 完整导航配置（可根据实际需求调整）
      navLinks: [
        {
          to: 'LuggageGenerator',
          text: '行李清单',
          icon: 'el-icon-suitcase',
          badge: '',
          show: true
        },
        {
          to: 'Transportation',
          text: '交通路线',
          icon: 'el-icon-map-location',
          badge: '推荐',
          show: true
        },
        {
          to: 'Documents',
          text: '入学文件',
          icon: 'el-icon-document',
          show: true
        },
        {
          to: 'Facilities',
          text: '周边设施',
          icon: 'el-icon-school',
          show: true
        }
      ]
    }
  },
  computed: {
    /**
     * 过滤出需要显示的导航项
     * 可在此处添加权限控制逻辑
     */
    filteredNavLinks() {
      return this.navLinks.filter(link => link.show)
    }
  },
  watch: {
    // 路由变化时更新页面标题
    '$route'(to) {
      document.title = `${to.meta.title || '入学准备'} - 智慧迎新系统`
    }
  },
  mounted() {
    // 初始化设置标题
    document.title = `${this.$route.meta.title || '入学准备'} - 智慧迎新系统`
  }
}
</script>

<style scoped lang="scss">
/* 主容器样式 */
.preparation-module {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f7fa;
}

/* 模块标题 */
.module-title {
  padding: 16px 24px;
  margin: 0;
  color: #303133;
  font-size: 20px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
}

/* 导航菜单样式 */
.sub-nav {
  display: flex;
  padding: 0 24px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  
  .nav-item {
    position: relative;
    padding: 12px 16px;
    margin-right: 8px;
    color: #606266;
    text-decoration: none;
    transition: all 0.3s;
    border-bottom: 2px solid transparent;
    
    &:hover {
      color: #1890ff;
    }
    
    .icon {
      margin-right: 8px;
    }
    
    .badge {
      position: absolute;
      top: 2px;
      right: 2px;
      padding: 0 4px;
      font-size: 10px;
      color: #fff;
      background: #f56c6c;
      border-radius: 10px;
      transform: scale(0.8);
    }
    
    &.active {
      color: #1890ff;
      border-bottom-color: #1890ff;
    }
    
    &.exact-active {
      font-weight: bold;
    }
  }
}

/* 内容区样式 */
.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #fff;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sub-nav {
    flex-wrap: wrap;
    padding: 0 12px;
    
    .nav-item {
      padding: 8px 12px;
      font-size: 14px;
    }
  }
  
  .content-wrapper {
    margin: 8px;
    padding: 12px;
  }
}
</style>