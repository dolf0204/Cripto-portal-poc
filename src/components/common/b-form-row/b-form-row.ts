import { Component, Vue, Prop } from "@/biss-core-wrapper";
import WithRender from "./b-form-row.html";
import "./b-form-row.scss";

@WithRender
@Component
class BFormRow extends Vue {

    @Prop({ default: null, type: String })
    private readonly label!: string;

}

export default BFormRow;
