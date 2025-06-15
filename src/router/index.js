import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthView from '../views/AuthView.vue';
import HomeView from '../views/HomeView.vue';
import store from '../store'; // 导入 store
import ProfileView from '../views/ProfileView.vue';
import ResetSuccess from '../components/Auth/ResetSuccess.vue'; // 添加导入语句
import RegisterSuccess from '../components/Auth/RegisterSuccess.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
    meta: { authRequired: false }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { authRequired: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { authRequired: true }
  },
  {
    path: '/reset-success',
    name: 'ResetSuccess',
    component: ResetSuccess,
    meta: {
      title: '密码重置成功',
      authRequired: false,
      allowAnonymous: true
    }
  },
  {
    path: '/register-success',
    name: 'RegisterSuccess',
    component: RegisterSuccess,
    meta: {
      title: '注册成功',
      authRequired: false,
      allowAnonymous: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 更新路由守卫
router.beforeEach((to, from, next) => {
  const isAuthRequired = to.matched.some(record => record.meta.authRequired);
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const isAuthPage = to.path === '/';
  const isAllowAnonymous = to.matched.some(record => record.meta.allowAnonymous);

  // 允许匿名访问的页面直接通过
  if (isAllowAnonymous) {
    next();
    return;
  }

  // 特殊处理重定向
  const isRedirectToLogin = to.query.redirect && isAuthPage;
  if (isRedirectToLogin) {
    next();
    return;
  }

  if (isAuthRequired && !isAuthenticated) {
    // 未登录访问需要认证的页面,跳转登录
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else if (isAuthPage && isAuthenticated) {
    // 已登录访问登录页,直接跳转首页
    next('/home');
  } else {
    next();
  }
});

export default router;