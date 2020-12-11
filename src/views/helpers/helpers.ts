import { Component, Vue } from "@/biss-core-wrapper";
import HelpersDocs from "@/components/docs/helpers-docs/helpers-docs";
import WithRender from "./helpers.html";

@WithRender
@Component({
    components: {
        HelpersDocs,
    },
})
class Helpers extends Vue {
}

export default Helpers;
