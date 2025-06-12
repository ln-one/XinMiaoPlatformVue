//main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js'; // 引入js文件
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/accessibility.css'
import '@/assets/styles/variables.css';
import '@/assets/styles/global.css';
import '@/assets/styles/transitions.css';
import '@/assets/styles/shared-styles.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
