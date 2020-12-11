import { Component, Vue } from "@/biss-core-wrapper";
import WithRender from "./not-found.html";
import "./not-found.scss";

@WithRender
@Component
class NotFound extends Vue {
}

export default NotFound;
