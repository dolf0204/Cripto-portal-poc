import { Component, Vue } from "@/biss-core-wrapper";
import LoginForm from "@/components/login-form/login-form";
import WithRender from "./login.html";
import "./login.scss";

@WithRender
@Component({
    components: {
        LoginForm,
    },
})
class Login extends Vue {
}

export default Login;
