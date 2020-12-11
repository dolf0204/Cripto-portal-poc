import { Component, Vue } from "@/biss-core-wrapper";
import NavigationMenu from "@/components/navigation-menu/navigation-menu";
import UserConfig from "@/components/user-config/user-config";
import AppBar from "@/components/app-bar/app-bar";
import Breadcrumbs from "@/components/common/breadcrumbs/breadcrumbs";
import WithRender from "./default.html";
import "./default.scss";

@WithRender
@Component({
    components: {
        NavigationMenu,
        UserConfig,
        AppBar,
        Breadcrumbs,
    },
})
class Default extends Vue {

    private leftDrawerOpen: boolean = false;

    private toogleDrawer(state: boolean) {
        this.leftDrawerOpen = state || !this.leftDrawerOpen;
    }

}

export default Default;
