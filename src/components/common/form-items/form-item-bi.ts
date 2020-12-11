import { Component, Vue, Prop } from "@/biss-core-wrapper";
import { QInputStyle, defaultStyle } from "./default-config";

type modelValue = unknown | string | number | null | undefined;

@Component
class FormItemBI extends Vue {

    protected wrapValidationWithPromise(
        validatorList: ((value: modelValue) => string | boolean)[],
    ): unknown[] {
        return validatorList.map((validator: ((value: modelValue) => string | boolean)) => (
        ) => new Promise(
            (resolve) => {
                const modalValue = this.model;
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

    protected getRules() {
        const rules = this.$_.cloneDeep(this.rules || []);
        let rulesPromise: unknown[] = [];

        if (this.styleProps.required) {
            rules.push(() => {
                const val = this.model;
                if (this.$_.isNil(val) || val === "") {
                    return this.$t("general.form.msg-is-required", { field: this.styleProps.label }) as string;
                }
                return true;
            });
        }

        if (rules.length) {
            rulesPromise = this.wrapValidationWithPromise(rules);
        }

        return rulesPromise;
    }

    protected model: modelValue | null = null;

    @Prop({ default: () => [], type: Array })
    protected readonly rules!: Array<() => string | boolean>;

    @Prop({ default: () => defaultStyle, type: Object })
    protected readonly styleProps!: QInputStyle | QInputStyle; // BUG with ts-loader module

}

export default FormItemBI;
