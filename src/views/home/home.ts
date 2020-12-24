import { Component, Vue } from "@/biss-core-wrapper";
import HomePage from "@/components/home-page/home-page";

import WithRender from "./home.html";

@WithRender
@Component({
    components: {
        HomePage,
    },
})
class Home extends Vue {

}

export default Home;
