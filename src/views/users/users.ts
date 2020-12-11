import { Component, Vue } from "@/biss-core-wrapper";
import UserData from "@/components/user-data/user-data";
import WithRender from "./users.html";

@WithRender
@Component({
    components: {
        UserData,
    },
})
class Users extends Vue {
}

export default Users;
