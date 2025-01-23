import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Cart from './components/Cart.vue';
import './index.css';

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');