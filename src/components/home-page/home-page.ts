import { Component, Prop, Vue } from "@/biss-core-wrapper";
import criptoApi from "@/dto/cripto-currency/cripto-currency-api";
import CriptoCurrencyResponse from "@/dto/cripto-currency/cripto-currency-response";
import CriptoCurrencyTimeStampResponse from "@/dto/cripto-currency/cripto-currency-time-stamp-response";
import BTable, { QColumn } from "@/components/common/b-table/b-table";
import WithRender from "./home-page.html";
import "./home-page.scss";

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
    },
})
class HomePage extends Vue {

    private initialPagination: ClientSitePagination = {
        sortBy: "desc",
        descending: false,
        page: 0,
        rowsPerPage: 10,
    }

    private data!: CriptoCurrencyResponse;

    @criptoApi("getCriptoCompareCriptoCurrencies")
    private getDataApi!: () => Promise<CriptoCurrencyResponse>;

    @criptoApi("getCriptoCompareCriptoCurrenciesTimeStamps")
    private getTimeStampDataApi!: () => Promise<CriptoCurrencyTimeStampResponse>;

    private timeStampData!: CriptoCurrencyTimeStampResponse;

    private pageChange(page: ClientSitePagination) {
        this.initialPagination.page = page.page;
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

        debugger;

        console.log(this.data);

        this.$q.loading.hide();

        const responseObjectTransform = this.data.data.criptoCurrency;

        debugger;

        return responseObjectTransform;

    }

}

export default HomePage;
