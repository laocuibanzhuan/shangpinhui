import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'

import { MessageBox } from 'element-ui'

import VueLazyload from 'vue-lazyload'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

import "@/mock/index"

import 'swiper/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueLazyload)
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages
  },
  attributes: {
    phone: '手机号码',
    code: '验证码',
    password: '密码',
    confirmPassword: '确认密码',
  }
})

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  store
}).$mount('#app')
