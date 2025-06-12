# 🌱 新苗校园平台

> 📚 后端项目代码: [XinMiaoSpringBoot](https://github.com/ln-one/XinMiaoSpringBoot)

## 📖 概述
新苗平台是一个为大学新生设计的综合校园服务平台，提供一站式解决方案，帮助新生快速适应校园生活。
本项目为前端部分，基于Vue.js开发。 

## 💻 新手开发指南

### 🔧 前置要求
1. 🚀 安装 Node.js（v14.0.0 或以上）
2. 📦 安装 Git
3. 📝 基础知识要求：
   - HTML/CSS/JavaScript 基础
   - Vue.js 基本概念
   - npm 包管理基础

### ⚙️ 项目搭建
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

### 📂 项目结构详解
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

### 🛠️ 开发指南

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

## 👶 零基础新手指南

### 🎯 第零步：基础准备
1. **🖥️ 电脑配置要求**
   - Windows 10 或以上系统
   - 至少8GB内存
   - 至少30GB可用硬盘空间
   - 稳定的网络连接

2. **📝 必备基础知识**
   - 掌握电脑基本操作
   - 了解文件和文件夹概念
   - 会使用浏览器搜索问题

3. **🛠️ 学习路径建议**
   - HTML (1周)：
     - 学习网站：https://www.runoob.com/html/html-tutorial.html
     - 重点：标签、表单、div布局
   - CSS (1周)：
     - 学习网站：https://www.runoob.com/css/css-tutorial.html
     - 重点：选择器、盒模型、Flex布局
   - JavaScript (2周)：
     - 学习网站：https://www.runoob.com/js/js-tutorial.html
     - 重点：变量、函数、数组、对象
   - Vue.js (2周)：
     - 学习网站：https://cn.vuejs.org/guide/introduction.html
     - 重点：组件、生命周期、数据绑定

### 🔧 详细安装步骤

1. **⚡ Node.js安装**
   ```bash
   # 1. 访问官网
   打开浏览器，访问：https://nodejs.org

   # 2. 下载
   点击左侧绿色按钮 "XX.XX.X LTS" (当前推荐版本)

   # 3. 安装
   - 双击下载的安装包
   - 点击 "Next" 直到完成
   - 重启电脑

   # 4. 验证
   - 按Win+R，输入cmd，点击确定
   - 在黑色窗口输入：node -v
   - 如果显示版本号(如v14.xx.x)则安装成功
   ```

2. **💻 VS Code安装与配置**
   ```bash
   # 1. 下载
   访问：https://code.visualstudio.com
   点击 "Download for Windows"

   # 2. 安装
   - 双击安装包
   - 全部勾选 "Additional Tasks"
   - 完成安装

   # 3. 安装中文语言包
   - 打开VS Code
   - 按Ctrl+Shift+X
   - 搜索 "Chinese"
   - 安装 "Chinese (Simplified)"
   - 重启VS Code

   # 4. 安装必备插件
   - Vetur (Vue开发必备)
   - ESLint (代码检查工具)
   - Prettier (代码格式化)
   - Auto Close Tag (自动闭合标签)
   - Auto Rename Tag (自动重命名标签)
   ```

### 📚 新手常见问题集锦

1. **❓ 遇到报错怎么办？**
   - 仔细阅读错误信息
   - 复制错误信息到百度/谷歌搜索
   - 查看控制台(F12)具体错误位置
   - 对照文档检查代码

2. **❓ 不会用命令行？**
   ```bash
   # 常用命令说明
   cd 文件夹名    # 进入指定文件夹
   cd ..         # 返回上一级
   dir           # 查看当前文件夹内容
   cls           # 清屏
   Tab键         # 自动补全文件名
   ```

3. **❓ 不会用Git？**
   ```bash
   # 基础Git命令
   git clone 仓库地址   # 下载项目
   git status         # 查看文件状态
   git add .          # 添加所有改动
   git commit -m "说明" # 提交改动
   git push           # 上传到远程
   ```

4. **❓ 代码写错了怎么办？**
   - Ctrl+Z 撤销改动
   - 使用VS Code的历史记录
   - 参考示例代码对比
   - 向团队成员求助

## ✨ 功能特点
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

## 🛠️ 技术特点
- ⚡ Vue.js 与 Element UI
- 🌓 明暗主题支持
- ♿ 无障碍性增强
- 📱 响应式设计
- 🔌 RESTful API 集成
- 🔒 JWT 身份认证

## ❓ 常见问题与解决方案
1. **📦 npm安装失败**
   - 清除npm缓存：`npm cache clean -f`
   - 删除node_modules并重新安装

2. **🚀 开发服务器问题**
   - 检查端口占用
   - 验证Node.js版本
   - 检查环境变量配置

3. **🔌 API连接问题**
   - 验证.env文件中的API配置
   - 检查网络连接
   - 验证token有效性

4. **🔄 Git相关问题**
   - 分支冲突解决
   - 提交规范说明
   - 代码审查流程

## 📝 代码提交规范
```bash
# 安装依赖
npm install

# 启动开发服务器 localhost:8086
npm run serve

# 构建生产版本
npm run build
```