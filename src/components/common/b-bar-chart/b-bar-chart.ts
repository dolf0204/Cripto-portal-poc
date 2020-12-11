import {
    Component,
    Prop,
    Mixins,
    Watch,
} from "@/biss-core-wrapper";
import { Bar, mixins } from "vue-chartjs";
import { ChartData, ChartOptions } from "chart.js";

const { reactiveProp } = mixins;

@Component
class BBarChart extends Mixins(reactiveProp, Bar) {

    @Prop({ type: Object })
    public readonly chartData!: ChartData;

    @Prop({ type: Object })
    public readonly chartOpts!: ChartOptions;

    private mounted() {
        this.renderChart(this.chartData, this.chartOpts);
    }

    @Watch("chartData")
    private refreshChart() {
        this.renderChart(this.chartData, this.chartOpts);
    }

}
export default BBarChart;
