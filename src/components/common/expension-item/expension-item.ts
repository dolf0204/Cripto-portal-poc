import { Component, Vue, Prop } from "@/biss-core-wrapper";
import WithRender from "./expension-item.html";
import "./expension-item.scss";

@WithRender
@Component
class ExpensionItem extends Vue {

    @Prop({ default: ["fal", "fa-solar-system"], type: Array })
    private icons!: string[];

    @Prop({ default: "TODO", type: String })
    private title!: string;

    @Prop({ default: 0, type: Number })
    private level!: number;

    @Prop({ default: null, type: String })
    private caption!: string | null;

    @Prop({ default: true, type: Boolean })
    private open!: boolean;

    private get icon() {
        return this.icons.join(" ");
    }

    private toggle() {
        this.open = !this.open;
    }

}

export default ExpensionItem;
