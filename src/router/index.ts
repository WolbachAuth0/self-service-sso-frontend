import { createRouter as createVueRouter, createWebHistory, Router } from "vue-router";
import { createAuthGuard } from "@auth0/auth0-vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import Callback from '../views/Callback.vue';
import { App } from 'vue';

export function createRouter(app: App): Router {
  const router = createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: '/callback',
        component: Callback
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/register",
        name: "register",
        component: Register,
        beforeEnter: createAuthGuard(app)
      }
    ],
    history: createWebHistory(),
  })

  return router
}
