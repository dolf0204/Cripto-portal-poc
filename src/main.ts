import { vueExtend } from "biss-core";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Vue, ReflectMetadata } from "@/biss-core-wrapper";
import App from "@/app/app";
import { LoginCookie } from "./util";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./quasar";
import "@fortawesome/fontawesome-pro/css/fontawesome.min.css";
import "@fortawesome/fontawesome-pro/css/solid.min.css";
import "@fortawesome/fontawesome-pro/css/light.min.css";
import i18n from "./i18n";

Vue.config.productionTip = false;
Vue.use(vueExtend);

window.onload = () => {
    LoginCookie.getInstance();

    new Vue({
        i18n,
        router,
        store,
        render: (h) => h(App),
    }).$mount("#app");
};

