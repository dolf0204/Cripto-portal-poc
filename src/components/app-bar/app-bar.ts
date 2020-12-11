import { Component, Vue } from "@/biss-core-wrapper";
import LoginCookie from "@/util/cookie-util/login-cookie";
import Navbar from "@/components/common/navbar/navbar";
import WithRender from "./app-bar.html";

@WithRender
@Component({
    components: {
        Navbar,
    },
})
class AppBar extends Vue {

    private appName: string = process.env.VUE_APP_NAME as string;

    private onMenuClick() {
        this.$emit("menu-click");
    }

    private onLogoutClick() {
        LoginCookie.clearLoginCookie();
        this.$router.push("/login");
    }

}

export default AppBar;
