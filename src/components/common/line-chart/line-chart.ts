import {
    Component,
    Prop,
    Mixins,
    Watch,
} from "@/biss-core-wrapper";
import { Line, mixins } from "vue-chartjs";
import { ChartData, ChartOptions } from "chart.js";

const { reactiveProp } = mixins;

@Component
class LineChart extends Mixins(reactiveProp, Line) {

    @Prop({ type: Object })
    public chartData!: ChartData;

    @Prop({ type: Object })
    public chartOpts!: ChartOptions;

    private mounted() {
        this.renderChart(this.chartData, this.chartOpts);
    }

    @Watch("chartData")
    private refreshChart() {
        this.renderChart(this.chartData, this.chartOpts);
    }

}
export default LineChart;
