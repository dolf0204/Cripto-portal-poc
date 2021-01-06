import {
    Component, Vue,
} from "@/biss-core-wrapper";
import BlockChainData from "@/components/block-chain-data/block-chain-data";
import WithRender from "./home-page.html";

@WithRender
@Component({
    components: {
        BlockChainData,
    },
})
class HomePage extends Vue {

}

export default HomePage;
