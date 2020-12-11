import { Component, Vue } from "@/biss-core-wrapper";
import Login from "@/dto/authentication/login";
import { LoginCookie } from "@/util";
import authenticationApi from "@/dto/authentication/authentication-api";
import WithRender from "./login-form.html";
import token from "./token";
import "./login-form.scss";

@WithRender
@Component
class LoginForm extends Vue {

    private model: Login = new Login();

    private appName: string = process.env.VUE_APP_NAME as string;

    @authenticationApi("login")
    private authenticationApi!: (login: Login) => Promise<string>

    private onSubmit() {
        if (this.model && this.model.password) {
            this.$async(async () => {
                // const data = await this.loginApi(this.model);
                LoginCookie.setLoginCookie(token);
                this.$router.push("/home");
            });
        }
    }

}

export default LoginForm;
