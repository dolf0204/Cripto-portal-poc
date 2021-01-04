import { Component, Prop, Vue } from "@/biss-core-wrapper";
import criptoApi from "@/dto/cripto-currency/cripto-currency-api";
import moment from "biss-core/node_modules/moment";
import theme from "@/styles/theme.scss";
import CriptoCurrencyTimeStampResponse from "@/dto/cripto-currency/cripto-currency-time-stamp-response";
import LineChart from "@/components/common/line-chart/line-chart";
import WithRender from "./cripto-currency-graph.html";
import "./cripto-currency-graph.scss";

@WithRender
@Component({
    components: {
        LineChart,
    },
})
class CriptoCurrencyGraph extends Vue {

    private loaded: boolean = false;

    private chart: LineChart = new LineChart();

    @Prop({ default: [], type: () => Array })
    private data: number[] = [];

    @Prop({ required: true, type: () => String })
    private currencySymbol!: string;

    @Prop({ default: [], type: () => Array })
    private labels: string[] = [];

    @criptoApi("getCriptoCompareCriptoCurrenciesTimeStamps")
    private getTimeStampDataApi!: (currency: string) => Promise<CriptoCurrencyTimeStampResponse>;

    private chartOpts: Record<string, unknown> = {
        responsive: true,
        legend: { display: false },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "USD",
                },
            }],
        },
    }

    private get chartData() {
        return {
            labels: this.labels,
            datasets: [
                {
                    backgroundColor: theme.primary,
                    data: this.data,

                },
            ],
        };
    }

    private async mounted() {
        this.loaded = false;

        const { responseData } = await this.getTimeStampDataApi(this.currencySymbol);
        const { data } = responseData;

        data.map((currency) => this.labels?.push((this.$_.toString(moment.unix(currency.time!).format("MM/DD/YYYY")))));
        data.map((currency) => this.data?.push((currency.open!)));

        this.loaded = true;

    }

}

export default CriptoCurrencyGraph;
