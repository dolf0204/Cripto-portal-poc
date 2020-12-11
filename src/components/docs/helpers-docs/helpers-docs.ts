import { Component, Vue } from "@/biss-core-wrapper";
import BCardRegion from "@/components/common/b-card-region/b-card-region";
import InfoRegion from "@/components/common/info-region/info-region";
import WithRender from "./helpers-docs.html";
import "./helper-docs.scss";

@WithRender
@Component({
    components: {
        BCardRegion,
        InfoRegion,
    },
})
class HelpersDocs extends Vue {

    private now = new Date();

    private get beforeOneHour() {
        return this.$moment(this.now).subtract(1, "h").toDate();
    }

    private get dates() {
        return {
            startTime: this.beforeOneHour,
            endTime: this.now,
        };
    }

}

export default HelpersDocs;
