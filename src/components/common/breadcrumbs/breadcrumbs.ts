import { Component, Vue } from "@/biss-core-wrapper";
import WithRender from "./breadcrumbs.html";

@WithRender
@Component
class Breadcrumbs extends Vue {

    private get breadcrumbs() {
        return [this.$route.meta];
    }

}

export default Breadcrumbs;
