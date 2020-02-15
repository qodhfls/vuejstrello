import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueLocalStorage from 'vue-localstorage'

Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

new Vue({
  localStorage:{
    boards:{
      type:Array
    }
  },
  render: h => h(App),
}).$mount('#app')
