import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "ListProduct",
    component: () => {
      return import("@/views/ListProduct.vue");
    },
  },
  {
    path: "/Cart",
    name: "Cart",
    component: () => {
      return import("@/views/Cart.vue");
    },
  },
  {
    path: "/History",
    name: "History",
    component: () => {
      return import("@/views/History.vue");
    },
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => {
      return import("@/views/Profile.vue");
    },
  },
  {
    path: "/DetailProduct/:id",
    name: "DetailProduct",
    component: () => {
      return import("@/views/DetailProduct.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
