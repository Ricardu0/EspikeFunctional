import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tailwindcss/tailwind.css';
import axios from 'axios';



router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/Login', '/Cadastro'];
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    next('/Login');
  } else {
    next();
  }
});

const app = createApp(App)

app.use(router)

app.mount('#app')
