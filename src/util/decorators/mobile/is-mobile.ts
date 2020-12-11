import { createDecorator } from "@/biss-core-wrapper";
import Vue, { ComponentOptions } from "vue";

const isMobile = createDecorator((compOpts: ComponentOptions<Vue>, key: string) => {
    const componentOptions = compOpts;

    if (!componentOptions.computed) {
        componentOptions.computed = {};
    }

    componentOptions.computed[key] = () => (
        Vue.prototype.$q.screen.sm || Vue.prototype.$q.screen.xs
    );
});

export default isMobile;
