import { createDecorator, _ } from "@/biss-core-wrapper";
import Vue, { ComponentOptions } from "vue";
import i18n from "@/i18n";

const lengthValidator = (val: string, len: number) => {
    if (!val) {
        return true;
    }

    return val.length <= len;
};

function validateCharLength(
    field: string, length: number, fieldLabelToken: string,
) {
    return createDecorator(
        /* eslint-disable prefer-arrow-callback */
        function decorator(compOpts: ComponentOptions<Vue>, key: string) {
            const componentOptions = compOpts;

            if (!componentOptions.methods) {
                componentOptions.methods = {};
            }

            componentOptions.methods[key] = function validator() {
                const cmp = (this as unknown as Vue.Component);
                const val = _.get(cmp, field);

                if (val && !lengthValidator(val, length)) {
                    const fieldLabel = i18n.t(fieldLabelToken);
                    return i18n.t("general.form.msg-max-number-of-char", { field: fieldLabel, nchar: length }) as string;
                }

                return true;
            };
        },
    );
}

export default validateCharLength;
export {
    lengthValidator,
};
