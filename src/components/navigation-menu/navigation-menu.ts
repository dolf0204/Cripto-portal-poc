import { Component, Vue, PropSync } from "@/biss-core-wrapper";
import UserConfig from "@/components/user-config/user-config";
import WithRender from "./navigation-menu.html";
import navigationListStore from "./list";
import NavigationItem from "./navigation-item/navigation-item";
import "./navigation-menu.scss";

@WithRender
@Component({
    components: { NavigationItem, UserConfig },
})
class NavigationMenu extends Vue {

    @PropSync("open", { default: () => true, type: Boolean })
    private drawerState!: boolean;

    private navigationListItems = navigationListStore;

}

export default NavigationMenu;
