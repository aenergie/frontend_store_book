import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../views/Books.vue";
import TemplateBase from "../views/TemplateBase.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

let userAutenticatedGuard = (to, from, next) => {

  if( !store.getters["auth/authenticated"] &&  to.name !== "Login" && to.name !== "Register" )
  {
    next({ name: "Login" })
  }
  else if( store.getters["auth/authenticated"] &&  (to.name == "Register" || to.name == "Login" ) )
  {
    next({ name: "Books" })
  }
  else next()
}

const routes = [
  {
    path :"",
    redirect: { name: "Books" }
  },
  {
    path: "",
    component: TemplateBase,
    children: [
      {
        path: "books",
        name: "Books",
        component: Books,
        beforeEnter: userAutenticatedGuard
      }
    ]
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: userAutenticatedGuard
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: userAutenticatedGuard
  },
  {
    path :"*",
    component:NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;