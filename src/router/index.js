import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue';
import LoginUser from '@/components/LoginUser.vue';
import CreateHistorie from '@/components/createHistorie.vue';
import PerfilUser from '@/components/PerfilUser.vue';


const routes = [
  { path: '/', redirect: '/login' }, // Redirigir la raíz al login
  {path: '/login', component: LoginUser},
  {path: '/homeScreen/', component: HomeScreen},
  {path: '/createHistorie', component: CreateHistorie},
  {path: '/perfilUser', component: PerfilUser},
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
