import { Component, Vue } from "@/biss-core-wrapper";
import ExpensionItem from "@/components/common/expension-item/expension-item";
import TokenData from "@/dto/authentication/token-data";
import { LoginCookie } from "@/util";
import WithRender from "./user-config.html";
import "./user-config.scss";

@WithRender
@Component({
    components: { ExpensionItem },
})
class UserConfig extends Vue {

    private tokenData: TokenData | null = LoginCookie.jwtData;

    private get fullName() {
        return this.tokenData ? this.tokenData.fullName : null;
    }

    private get avatar() {
        return this.tokenData ? this.tokenData.avatar : null;
    }

    private get email() {
        return this.tokenData ? this.tokenData.email : null;
    }

}

export default UserConfig;
