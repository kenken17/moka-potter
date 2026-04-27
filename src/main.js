import './assets/styles/global.css';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import BrewDetail from './views/BrewDetail.vue'
import DayView from './views/DayView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/brew/:id', component: BrewDetail },
  { path: '/day/:date', component: DayView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
