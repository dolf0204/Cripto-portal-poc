import { Component, Vue } from "@/biss-core-wrapper";
import LoginCookie from "@/util/cookie-util/login-cookie";
import WithRender from "./logout-item.html";
import "./logout-item.scss";

@WithRender
@Component
class LogoutItem extends Vue {

    private onLogout() {
        LoginCookie.clearLoginCookie();
        this.$router.push("/login");
    }

}

export default LogoutItem;
