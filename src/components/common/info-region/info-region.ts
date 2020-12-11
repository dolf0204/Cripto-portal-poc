import { Component, Vue, Prop } from "@/biss-core-wrapper";
import WithRender from "./info-region.html";
import "./info-region.scss";

enum STATUS {
    info,
    warning,
    error,
}

@WithRender
@Component
class InfoRegion extends Vue {

    @Prop({ default: () => null, type: String })
    private readonly message!: string | null;

    @Prop({ default: () => STATUS.info, type: Number })
    private readonly status!: STATUS;

    private get isError(): boolean {
        return this.status === STATUS.error;
    }

    private get isWarning(): boolean {
        return this.status === STATUS.warning;
    }

    private get isInfo(): boolean {
        return this.status === STATUS.info;
    }

}

export default InfoRegion;
export {
    STATUS,
};
