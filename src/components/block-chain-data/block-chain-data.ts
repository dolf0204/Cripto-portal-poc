import {
    Component, Vue,
} from "@/biss-core-wrapper";
import CriptoCurrency from "@/dto/cripto-currency/cripto-currency";
import CriptoCurrencyGraph from "@/components/cripto-currency-graph/cripto-currency-graph";
import BlockChainTable from "./block-chain-table";
import WithRender from "./block-chain-data.html";

@WithRender
@Component({
    components: {
        BlockChainTable,
        CriptoCurrencyGraph,
    },
})
class BlockChainData extends Vue {

    private chartOpen: boolean = false;

    private symbol: string | null = null;

    private criptoCurrencyGraphKey: string = this.$_.uniqueId();

    private showChart(row: CriptoCurrency) {
        debugger;
        this.criptoCurrencyGraphKey = this.$_.uniqueId();
        this.symbol = row.symbol;
        this.chartOpen = true;
    }

}

export default BlockChainData;
