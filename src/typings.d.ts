declare module "*.html" {
    import Vue, { ComponentOptions } from "vue";

    interface WithRender {
      <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>;
      <V extends typeof Vue>(component: V): V;
    }

    const withRender: WithRender;
    export = withRender;
}

declare module "*.png" {
    const value: unknown;
    export default value;
}

declare module "*.jpeg" {
    const value: unknown;
    export default value;
}

declare module "*.svg" {
    const value: unknown;
    export default value;
}
