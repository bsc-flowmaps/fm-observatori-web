import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'

import VCalendar from 'v-calendar';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BaseCard from './components/ui/BaseCard.vue';
import TitleWrapper from './components/ui/TitleWrapper.vue';
import ButtonWrapper from './components/ui/ButtonWrapper.vue';

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VCalendar)

Vue.component('base-card', BaseCard)
Vue.component('title-wrapper', TitleWrapper)
Vue.component('button-wrapper', ButtonWrapper)

Vue.store = Vue.prototype.store = {scroll: false};

new Vue({
  render: h => h(App),
}).$mount('#app')
