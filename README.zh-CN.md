
```markdown
# 新苗校园平台

## 概述
新苗平台是一个为大学新生设计的综合校园服务平台，提供一站式解决方案，帮助新生快速适应校园生活。 

## 新手开发指南

### 前置要求
1. 安装 Node.js（v14.0.0 或以上）
2. 安装 Git
3. 基础知识要求：
   - HTML/CSS/JavaScript 基础
   - Vue.js 基本概念
   - npm 包管理基础

### 项目搭建
```bash
# 1. 克隆仓库
git clone https://github.com/your-username/XinMiaoPlatform.git

# 2. 进入项目目录
cd XinMiaoPlatform

# 3. 安装依赖
npm install

# 4. 创建环境变量文件
cp .env.example .env

# 5. 启动开发服务器
npm run serve
```

### 项目结构详解
```
src/
│
├── assets/          # 静态资源
│   ├── styles/     # 全局样式文件
│   └── images/     # 图片资源
│
├── components/     # Vue可复用组件
│   ├── Auth/      # 认证相关组件
│   ├── Common/    # 通用UI组件
│   └── Profile/   # 个人信息相关组件
│
├── views/         # 页面组件
│   ├── HomeView.vue     # 首页
│   ├── AuthView.vue     # 认证页
│   └── ProfileView.vue  # 个人信息页
│
├── store/         # Vuex状态管理
│   ├── index.js
│   └── modules/
│       └── auth.js    # 认证状态管理
│
├── services/      # API服务
│   └── api.js    # API调用封装
│
└── router/        # 路由配置
    └── index.js
```

### 开发指南

#### 1. 开发新功能
1. 创建新分支
   ```bash
   git checkout -b feature/你的功能名称
   ```
2. 遵循现有组件结构
3. 使用预定义的CSS变量保持风格一致
4. 实现错误处理
5. 添加适当的注释
6. 充分测试

#### 2. 组件开发示例
```vue
<!-- 组件基本结构示例 -->
<template>
  <div class="component-container">
    <!-- 结构示例 -->
    <h1>{{ title }}</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <!-- 内容区域 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  data() {
    return {
      title: '',
      loading: false,
      error: null
    }
  },
  methods: {
    // 方法示例
    async fetchData() {
      try {
        this.loading = true
        // API调用
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* 使用预定义的CSS变量 */
.component-container {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-lg);
}
</style>
```

#### 3. API调用示例
```javascript
// 使用API服务
import api from '@/services/api'

// API调用示例
async function handleLogin(credentials) {
  try {
    const response = await api.login(credentials)
    // 处理成功响应
  } catch (error) {
    // 错误处理
    console.error('登录失败:', error)
  }
}
```

#### 4. 状态管理使用
```javascript
// Vuex状态管理示例
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', ['login', 'logout'])
  }
}
```

## 零基础新手指南

### 第一步：环境准备
1. **安装 Node.js**
   - 访问 https://nodejs.org
   - 下载并安装 LTS 版本
   - 打开命令行，输入 `node -v` 验证安装成功
   
2. **安装 Visual Studio Code**
   - 访问 https://code.visualstudio.com
   - 下载并安装
   - 安装以下插件：
     - Vetur (Vue工具)
     - ESLint (代码检查)
     - Prettier (代码格式化)

3. **安装 Git**
   - 访问 https://git-scm.com
   - 下载并安装
   - 打开命令行，输入 `git --version` 验证

### 第二步：项目设置
1. **克隆项目**
   ```bash
   # 在命令行中依次输入：
   cd D:\你的工作目录
   git clone https://github.com/your-username/XinMiaoPlatform.git
   cd XinMiaoPlatform
   ```

2. **安装项目依赖**
   ```bash
   # 确保在项目目录下
   npm install
   # 如果出现错误，尝试：
   npm install --legacy-peer-deps
   ```

### 第三步：开始开发
1. **修改配置文件**
   - 复制 `.env.example` 文件并重命名为 `.env`
   - 修改其中的配置项：
     ```
     VUE_APP_API_URL=http://localhost:8087
     VUE_APP_NAME=新苗平台
     ```

2. **启动开发服务器**
   ```bash
   npm run serve
   # 等待编译完成，打开浏览器访问 http://localhost:8086
   ```

3. **代码结构说明**
   ```
   src/
   ├── views/         # 这里放页面文件
   │   └── Demo.vue   # 示例：新建页面就放这里
   ├── components/    # 这里放可复用的组件
   │   └── Demo/      # 示例：新组件放这里
   └── assets/        # 这里放图片等资源
   ```

### 第四步：开发新功能
1. **创建新分支**
   ```bash
   # 在开发新功能前，先创建新分支
   git checkout -b feature/你的功能名
   ```

2. **创建新页面示例**
   ```vue
   <!-- 在 src/views 下创建新的 .vue 文件 -->
   <template>
     <div class="page-container">
       <h1>{{ pageTitle }}</h1>
       <!-- 页面内容 -->
     </div>
   </template>

   <script>
   export default {
     name: 'PageName',
     data() {
       return {
         pageTitle: '页面标题'
       }
     }
   }
   </script>
   ```

3. **添加路由**
   ```javascript
   // 在 router/index.js 中添加
   {
     path: '/your-path',
     name: 'YourPage',
     component: () => import('@/views/YourPage.vue')
   }
   ```

### 常见问题解决
1. **npm 安装报错**
   ```bash
   # 依次尝试：
   npm cache clean -f
   rm -rf node_modules
   npm install
   ```

2. **运行时报错**
   - 检查 Node.js 版本是否符合要求
   - 确认所有依赖安装正确
   - 查看浏览器控制台错误信息

3. **Git 操作问题**
   ```bash
   # 撤销本地修改
   git checkout .
   
   # 拉取最新代码
   git pull origin main
   
   # 提交修改
   git add .
   git commit -m "描述你的修改"
   git push
   ```

### 参考资源
- Vue.js 官方文档: https://cn.vuejs.org/
- Element UI 文档: https://element.eleme.cn/
- MDN Web 文档: https://developer.mozilla.org/zh-CN/

## 功能特点
- 🔐 账号管理
  - 安全的登录注册系统
  - 密码找回功能
  - 个人信息管理
  
- 🎓 入学前准备
  - 录取通知指南
  - 资料清单
  - 宿舍安排

- 💡 个性化推荐
  - 课程推荐
  - 社团建议
  - 校园活动

## 技术特点
- Vue.js 与 Element UI
- 明暗主题支持
- 无障碍性增强
- 响应式设计
- RESTful API 集成
- JWT 身份认证

## 常见问题与解决方案
1. **npm安装失败**
   - 清除npm缓存：`npm cache clean -f`
   - 删除node_modules并重新安装

2. **开发服务器问题**
   - 检查端口占用
   - 验证Node.js版本
   - 检查环境变量配置

3. **API连接问题**
   - 验证.env文件中的API配置
   - 检查网络连接
   - 验证token有效性

4. **Git相关问题**
   - 分支冲突解决
   - 提交规范说明
   - 代码审查流程

## 代码提交规范
```bash
# 安装依赖
npm install

# 启动开发服务器 localhost:8086
npm run serve

# 构建生产版本
npm run build