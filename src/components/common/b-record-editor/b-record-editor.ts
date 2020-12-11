import {
    Vue,
    Component,
    Ref,
} from "@/biss-core-wrapper";
import Dto from "@/dto/dto";
import BCardRegion from "@/components/common/b-card-region/b-card-region";
import BDateTimePicker from "@/components/common/form-items/b-date-time-picker/b-date-time-picker";
import BSelect, { DvRv } from "@/components/common/form-items/b-select/b-select";
import BFormRow from "@/components/common/b-form-row/b-form-row";
import { QForm } from "quasar";
import WithRender from "./b-record-editor.html";

type validationCallback = (value: unknown) => true | string

interface RecordDefinition {
    component: "QInput" | "QToggle" | "BDateTimePicker" | "BSelect";
    propName: string;
    label: string;
    type?: "text" | "password" | "textarea" | "email" | "search" | "tel" | "file" | "number" | "url";
    dateTimeformat?: string;
    required?: boolean;
    disable?: boolean;
    options?: DvRv[];
    validations?: validationCallback[];
    changeCallback?: (value: unknown) => void;
}

@WithRender
@Component({
    components: {
        BCardRegion,
        BDateTimePicker,
        BFormRow,
        BSelect,
    },
})
class BRecordEditor extends Vue {

    protected getRules(rec: RecordDefinition) {
        const rules = this.$_.cloneDeep(rec.validations || []) as validationCallback[];
        let rulesPromise: unknown[] = [];

        if (rec.required) {
            rules.push(() => {
                const val = (this.model as Record<string, unknown>)[rec.propName];
                if (this.$_.isNil(val) || val === "") {
                    return this.getRequiredMessage(rec.label) as string;
                }
                return true;
            });
        }

        if (rules.length) {
            rulesPromise = this.wrapValidationWithPromise(rules, rec.propName);
        }

        return rulesPromise;
    }

    protected wrapValidationWithPromise(
        validatorList: validationCallback[],
        propName: string,
    ): unknown[] {
        return validatorList.map((validator: validationCallback) => () => new Promise(
            (resolve) => {
                const modalValue = (this.model as Record<string, unknown>)[propName];
                const res = validator(modalValue) as unknown;

                if (res instanceof Promise) {
                    res.then((value) => {
                        resolve(value);
                    });
                } else {
                    resolve(res);
                }
            },
        ));
    }

    protected numberFormat(value: unknown, prop: string) {
        this.recordDefinition.forEach((recordDefinition: RecordDefinition) => {
            if (recordDefinition.propName === prop && recordDefinition.type === "number") {
                const modalValue = (this.model as Record<string, unknown>)[prop];
                if (!this.$_.isNil(modalValue) && modalValue !== "") {
                    (this.model as Record<string, unknown>)[prop] = this.$_.toNumber(modalValue);
                } else {
                    (this.model as Record<string, unknown>)[prop] = null;
                }
            }
        });

        this.valueCallback(value, prop);
    }

    protected valueCallback(value: unknown, prop: string) {
        const rec = this.recordDefinition.find(
            (recordDefinition: RecordDefinition) => recordDefinition.propName === prop,
        );

        if (rec && rec.changeCallback) {
            if (rec.type === "number") {
                const modalValue = (this.model as Record<string, unknown>)[prop];
                rec.changeCallback(modalValue);
            } else {
                rec.changeCallback(value);
            }
        }
    }

    protected back() {
        this.$router.back();
    }

    protected async validate(focusInvalid?: boolean) {
        return this.form.validate(focusInvalid);
    }

    protected getRequiredMessage(field: string) {
        return this.$t("general.form.msg-is-required", { field });
    }

    // eslint-disable-next-line class-methods-use-this
    protected save() {
    }

    protected recordDefinition!: RecordDefinition[];

    protected entityTitle!: string | null;

    protected model!: Dto;

    protected get isCreate() {
        const { id } = this.$route.params;
        return !id;
    }

    protected get urlId() {
        return this.$_.toInteger(this.$route.params.id);
    }

    protected get title() {
        let action = (this.$t("general.create") as string);

        if (!this.isCreate) {
            action = (this.$t("general.edit") as string);
        }

        return `${action} ${this.entityTitle?.toLowerCase()}`;
    }

    protected titleIcon: string = "fal fa-atom";

    @Ref("formEditor")
    protected readonly form!: QForm;

}

export default BRecordEditor;
export {
    RecordDefinition,
    validationCallback,
};
