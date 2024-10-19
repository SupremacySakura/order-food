import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import UserView from '@/views/UserView.vue'
import ShopView from '@/views/ShopView.vue'
import LoginView from '@/views/loginView.vue'
import ConfirmOrderView from '@/views/ConfirmOrderView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      redirect:'/home',
      children: [
        { path: 'home', name: 'home', component: HomeView },
        { path: 'order', name: 'order', component: OrderView },
        { path: 'user', name: 'uesr', component: UserView },
      ]
    },
    {
      path:'/shop',
      name:'shop',
      component:ShopView
    },
    {
      path:'/login',
      name:'login',
      component:LoginView
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfirmOrderView
    }
  ]
})

export default router
