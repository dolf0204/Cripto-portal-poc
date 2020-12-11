import { createDecorator, _, moment } from "@/biss-core-wrapper";
import Vue, { ComponentOptions } from "vue";
import i18n from "@/i18n";

/* eslint-disable prefer-arrow-callback */
function isDate(field: string, formatString?: string) {
    return createDecorator(
        function decorator(compOpts: ComponentOptions<Vue>, key: string) {
            const componentOptions = compOpts;

            if (!componentOptions.methods) {
                componentOptions.methods = {};
            }

            componentOptions.methods[key] = function validateDate() {
                const cmp = (this as unknown as Vue.Component);
                let val = _.get(cmp, field) || _.get(cmp, field);

                if (!val) {
                    return true;
                }

                if (formatString) {
                    val = moment(val, formatString).toDate();
                }

                if (!moment(val).isValid()) {
                    return i18n.t("general.form.msg-value-is-invalid", { value: val, type: "Date" }) as string;
                }
                return true;
            };
        },
    );
}

export default isDate;
