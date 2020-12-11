import { Component, Vue } from "@/biss-core-wrapper";
import WithRender from "./user-data.html";

@WithRender
@Component
class UserData extends Vue {
}

export default UserData;
