
import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "@/views/home/home";
import DefaultLayout from "@/layout/default/default";
import NotFoundLayout from "@/layout/not-found/not-found";
import LoginLayout from "@/layout/login/login";
import LoginView from "@/views/login/login";
import NotFoundView from "@/views/not-found/not-found";
import Helpers from "@/views/helpers/helpers";
import Users from "@/views/users/users";
import { LoginCookie } from "@/util";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [{
            path: "home",
            component: Home,
            meta: {
                label: "Home",
                icon: "fal fa-home",
            },
        },
        {
            path: "users",
            component: Users,
            meta: {
                label: "User",
                icon: "fal fa-users",
            },
        },
        {
            path: "helpers",
            component: Helpers,
            meta: {
                label: "Helpers",
                icon: "fal fa-list-ol",
            },
        }],
    }, {
        path: "/",
        component: LoginLayout,
        children: [{
            path: "login",
            component: LoginView,
        }],
    }, {
        path: "/",
        component: NotFoundLayout,
        children: [{
            path: "not-found",
            component: NotFoundView,
        }],
    }, {
        path: "*",
        redirect: "/not-found",
    },
];

const router = new VueRouter({
    base: process.env.VUE_APP_BASE_URL,
    mode: "history",
    routes,
});

router.beforeEach((to: Route, from: Route, next: (path?: string) => void) => {
    if (to.path !== "/login" && !LoginCookie.cookie) {
        next("/login");
    } else {
        next();
    }
});

export default router;
