import {
    Component,
    Prop,
    Mixins,
} from "@/biss-core-wrapper";
import { QPopupProxy } from "quasar";
import { defaultStyle, QInputStyle } from "../default-config";
import FormItemBI from "../form-item-bi";
import WithRender from "./b-date-time-picker.html";

type optisonDateCallbacks = () => Date[]

interface DateTimeStyle extends QInputStyle {
    options?: Date[] | optisonDateCallbacks;
    showPickerOnFocus?: boolean;
    locale?: {
        days: string[];
        daysShort: string[];
        months: string[];
        monthsShort: string[];
        firstDayOfWeek: number;
    };
    pickerPositions?: {
        datePicker?: "prepend" | "append";
        timePicker?: "prepend" | "append";
    };
}

const defaultPickerPositions: {[key: string]: string} = {
    datePicker: "prepend",
    timePicker: "append",
};

@WithRender
@Component
class BDateTimePicker extends Mixins(FormItemBI) {

    @Prop({ default: defaultStyle, type: Object })
    protected readonly styleProps!: DateTimeStyle | DateTimeStyle; // BUG with ts-loader module

    protected model: string | null = null;

    @Prop({ default: () => null, type: Date })
    private readonly value!: Date;

    @Prop({ default: () => false, type: Boolean })
    private readonly format24h!: Date;

    @Prop({ default: () => "DD.MM.YYYY HH:mm", type: String })
    private readonly mask!: string;

    private popupRefs: { [key: string]: string} = {
        datePopup: "datePopup",
        timePopup: "timePopup",
    };

    private get inputStyle() {
        const def = this.$_.cloneDeep(defaultStyle);
        return {
            ...def,
            ...this.styleProps,
        };
    }

    private get dateOptions() {
        const { options } = this;

        return options && options.map((date: Date) => this.$moment(date).format("YYYY/MM/DD"));
    }

    private get options(): Date[] {
        let { options } = this.styleProps;

        if (typeof options === "function") {
            options = (options as optisonDateCallbacks)();
        }

        return options as Date[];
    }

    private get datePickerPosition(): string {
        return this.getPickerPosition("datePicker");
    }

    private get timePickerPosition(): string {
        return this.getPickerPosition("timePicker");
    }

    private getPickerPosition(name: string) {
        const positions = this.styleProps.pickerPositions as {[key: string]: string};
        let position = positions && positions[name];

        if (!position) {
            position = defaultPickerPositions[name];
        }

        return position;
    }

    private onClick() {
        if (this.styleProps.showPickerOnFocus) {
            this.togglePopup(true);
        }
    }

    private togglePopup(forcedState?: boolean) {
        const { datePopup, timePopup } = this.popupRefs;
        const popup = (this.$refs[datePopup] || this.$refs[timePopup]) as QPopupProxy | undefined;
        if (popup) {
            const iconEl = (popup.$parent.$el as HTMLElement);
            iconEl.focus();
            if (this.$_.isNil(forcedState)) {
                popup.toggle();
            } else if (forcedState) {
                popup.show();
            } else {
                popup.hide();
            }
        }
    }

    private onChange() {
        const { options } = this;
        let val = this.model ? this.$moment(this.model, this.mask).toDate() : null;
        if (val && options) {
            const optDate = options.find(
                (date: Date) => this.$moment(val as Date).unix() === this.$moment(date).unix(),
            ) || null;
            if (!optDate) {
                val = null;
            }
        }

        this.model = val && this.$moment(val).format(this.mask);
        this.$emit("input", val);

        if (this.styleProps.showPickerOnFocus) {
            this.togglePopup(false);
            const el = this.$el.querySelector("input") as HTMLElement;
            if (el) {
                el.blur();
            }
        }
    }

    private get hasMaskDate() {
        return this.mask.includes("DD")
            || this.mask.includes("MM")
            || this.mask.includes("YYYY");
    }

    private get hasMaskTime() {
        return this.mask.includes("HH")
            || this.mask.includes("mm");
    }

    private created() {
        this.model = this.value && this.$moment(this.value).format(this.mask);
    }

}

export default BDateTimePicker;
export { DateTimeStyle };
