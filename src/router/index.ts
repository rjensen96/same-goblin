import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Game from "../views/Game.vue";
import Settings from "../views/Settings.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
