import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
