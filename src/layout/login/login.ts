import { Component, Vue } from "@/biss-core-wrapper";
import WithRender from "./login.html";
import "./login.scss";

@WithRender
@Component
class Login extends Vue {
}

export default Login;
