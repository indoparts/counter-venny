import "./assets/styles.css";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Permissions from './store/permissions'

Vue.config.productionTip = false
Vue.mixin(Permissions)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
