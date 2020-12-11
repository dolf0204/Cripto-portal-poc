import { createDecorator, _ } from "@/biss-core-wrapper";
import Vue, { ComponentOptions } from "vue";
import i18n from "@/i18n";

interface VueDecorator {
    (Ctor: typeof Vue): void;
    (target: Vue, key: string): void;
    (target: Vue, key: string, index: number): void;
}

interface LengOpts {
    value?: number;
    min?: number;
    max?: number;
}

const isInRange = (opts: LengOpts): boolean => {
    const { max, min, value } = opts;

    // don't validate if value undefined or null
    if (!value) {
        return true;
    }

    if (max && min) {
        return value >= min;
    }

    if (min && max) {
        return value <= max;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (value >= min! && value <= max!);
};

function validateNumberRange(
    field: string,
    fieldLabelToken: string,
    min?: number,
    max?: number,
): VueDecorator {
    return createDecorator(
        /* eslint-disable prefer-arrow-callback */
        function decorator(compOpts: ComponentOptions<Vue>, key: string) {
            const componentOptions = compOpts;

            if (!componentOptions.methods) {
                componentOptions.methods = {};
            }

            componentOptions.methods[key] = function validator() {
                const cmp = (this as unknown as Vue.Component);
                let val = _.get(cmp, field);

                if (typeof val === "string") {
                    val = _.toNumber(val);
                }

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                if (!_.isNil(val) && !isInRange({ value: val!, min, max })) {
                    const fieldLabel = i18n.t(fieldLabelToken);
                    return i18n.t("general.form.msg-number-range", { field: fieldLabel, min, max }) as string;
                }

                return true;
            };
        },
    );
}

export default validateNumberRange;
export {
    LengOpts,
    isInRange,
};
