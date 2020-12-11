import { Component, Vue, Prop } from "@/biss-core-wrapper";
import WithRender from "./b-card-region.html";
import "./b-card-region.scss";

@WithRender
@Component
class BCardRegion extends Vue {

    @Prop({ default: () => null, type: String })
    private readonly title!: string;

    @Prop({ default: () => null, type: String })
    private readonly titleIcon!: string;

    @Prop({ default: () => false, type: Boolean })
    private readonly strip!: boolean;

}

export default BCardRegion;
