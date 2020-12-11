import {
    Component,
    Prop,
    Mixins,
    Model,
    Emit,
    Ref,
} from "@/biss-core-wrapper";
import { QSelect } from "quasar";
import { QInputStyle, defaultStyle } from "../default-config";
import FormItemBI from "../form-item-bi";
import WithRender from "./b-select.html";

type filterCallback = (val: string, callback: () => void) => void;

interface BSelectOpts extends QInputStyle {
    filterFn?: (query: string, filterCallback: filterCallback) => void;
    required?: boolean;
    multiple?: boolean;
}

interface DvRv {
    label: string;
    value: string | number;
}

@WithRender
@Component
class BSelect extends Mixins(FormItemBI) {

    protected model: DvRv | null = null;

    @Prop({ default: () => defaultStyle, type: Object })
    protected readonly styleProps!: BSelectOpts | BSelectOpts; // BUG with ts-loader module

    @Model("change", { default: () => null, type: [String, Number] })
    private value!: string | number | DvRv | null;

    @Prop({ required: false, type: Array, default: () => [] })
    private readonly options!: DvRv[];

    @Ref("b-select")
    private select!: QSelect

    private get inputStyle() {
        const def = this.$_.cloneDeep(defaultStyle);
        return {
            ...def,
            ...this.styleProps,
        };
    }

    @Emit("change")
    private onChange() {
        const dvRv = this.model;
        const val = dvRv && dvRv.value ? dvRv.value : dvRv;
        return val;
    }

    private onFilter(query: string, filterCallback: () => void) {
        const { filterFn } = this.inputStyle;
        if (filterFn) {
            filterFn(query, filterCallback);
        } else {
            filterCallback();
        }
    }

    private created() {
        this.model = this.options.find(
            (opts: DvRv) => (opts.value as string) === (this.value as string),
        ) || null as unknown as DvRv;
    }

    private beforeDestroy() {
        const { filterFn } = this.inputStyle;

        if (filterFn) {
            this.select.$off("filter", filterFn);
        }
    }

}

export default BSelect;
export {
    DvRv,
    BSelectOpts,
};
