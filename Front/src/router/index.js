import { createRouter, createWebHistory } from 'vue-router';
import CadastroView from '../views/CadastroView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import MapView from '../views/MapView.vue';
import ModeratorView from "@/views/ModeratorView.vue";
import MenuView from "@/views/MenuView.vue";
import SComportmentView from "@/views/SComportmentView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Cadastro',
    name: 'Cadastro',
    component: CadastroView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Moderador',
    name: 'Moderador',
    component: ModeratorView
  },
  {
    path: '/Mapa',
    name: 'Mapa',
    component: MapView
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/Suspect',
    name: 'Suspect',
    component: SComportmentView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
