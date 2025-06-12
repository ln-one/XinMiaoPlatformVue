import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 按需引入组件（可选）
import {
  Button,
  Card,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

Vue.use(ElementUI)
// 或者按需注册组件
Vue.use(Button)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 挂载全局方法
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$notify = Notification

// 配置 Element UI 主题
const setElementTheme = (isDark) => {
  if (isDark) {
    ElementUI.Table.methods.toggleRowSelection = function () {
      // 覆盖表格选择行的背景色
      this.tableBody.style.backgroundColor = 'var(--bg-tertiary)';
    };
  }
}

// 导出主题切换方法供全局使用
Vue.prototype.$setElementTheme = setElementTheme;