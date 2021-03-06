// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import "./assets/css/reset.css"
import reg from "./util/regular"
//引入公共组件
import commonComponents from "./components"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

Vue.prototype.$reg=reg;
//引入过滤器
import filters from "./filters"
for(let i in filters){
  Vue.component(i,filters[i])
}

// 引入element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

Vue.prototype.$imgPro="http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
