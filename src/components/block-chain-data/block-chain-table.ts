import {
    Component, Vue,
} from "@/biss-core-wrapper";
import criptoApi from "@/dto/cripto-currency/cripto-currency-api";
import CriptoCurrencyResponse from "@/dto/cripto-currency/cripto-currency-response";
import CriptoCurrencyTimeStampResponse from "@/dto/cripto-currency/cripto-currency-time-stamp-response";
import CriptoCurrencyGraph from "@/components/cripto-currency-graph/cripto-currency-graph";
import BTable, { QColumn } from "@/components/common/b-table/b-table";
import WithRender from "./block-chain-table.html";
import "./block-chain-table.scss";

interface ClientSitePagination {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
}

@WithRender
@Component({
    components: {
        BTable,
        CriptoCurrencyGraph,
    },
})
class BlockChainTable extends Vue {

    private initialPagination: ClientSitePagination = {
        sortBy: "desc",
        descending: false,
        page: 0,
        rowsPerPage: 10,
    }

    private data: CriptoCurrencyResponse | null = null;

    @criptoApi("getCriptoCompareCriptoCurrencies")
    private getDataApi!: () => Promise<CriptoCurrencyResponse>;

    @criptoApi("getCriptoCompareCriptoCurrenciesTimeStamps")
    private getTimeStampDataApi!: () => Promise<CriptoCurrencyTimeStampResponse>;

    private timeStampData: CriptoCurrencyTimeStampResponse | null = null;

    private pageChange(clientSitePagination: ClientSitePagination) {
        this.initialPagination.page = clientSitePagination.page;
    }

    // eslint-disable-next-line class-methods-use-this
    private criptoColumns(): QColumn[] {

        const columnsDefinition = [];

        columnsDefinition.push(

            {
                name: "Id",
                label: "Id",
                field: "id",
                align: "left",
            },
            {
                name: "Symbol",
                label: "Symbol",
                field: "symbol",
                align: "left",
            },

        );

        return columnsDefinition;
    }

    private async fetchData() {

        this.$q.loading.show();

        this.data = await this.getDataApi();

        this.timeStampData = await this.getTimeStampDataApi();

        this.$q.loading.hide();

        const responseObjectTransform = this.data.data.criptoCurrency;

        return responseObjectTransform;

    }

}

export default BlockChainTable;
