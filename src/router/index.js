import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/index.vue";
import EscalonamentoCircular from "../views/EscalonamentoCircular/index.vue";

const routes = [
  {
    path: "/",
    name: "Home_",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/escalonamentoCircular",
    name: "EscalonamentoCircular",
    component: EscalonamentoCircular,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
