import { Component, Vue, Prop } from "@/biss-core-wrapper";
import ExpensionItem from "@/components/common/expension-item/expension-item";
import WithRender from "./navigation-item.html";
import { NavigationEntry, Link } from "../list";
import "./navigation-item.scss";

@WithRender
@Component({
    name: "navigation-item",
    components: {
        ExpensionItem,
    },
})
class NavigationItem extends Vue {

    @Prop({ default: () => ["fal", "fa-solar-system"], type: Array })
    private icons!: string[];

    @Prop({ default: () => "TODO", type: String })
    private title!: string;

    @Prop({ default: () => "", type: String })
    private caption!: string;

    @Prop({ default: () => null, type: [Object, String] })
    private link!: Link | string | null;

    @Prop({ default: () => [], type: Array })
    private childNodes!: NavigationEntry[];

    @Prop({ default: undefined, type: Number })
    private level!: number | undefined;

    private get isActive() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.url && this.$_.startsWith(this.$route.path, this.url!);
    }

    private get url() {

        let link = null;
        if (this.$_.isString(this.link)) {
            link = this.link;
        } else if (this.link && this.$_.isPlainObject(this.link)) {
            link = this.link.url;

        }

        return link;
    }

    private get tag() {
        const url = this.url || "";

        return url.includes("http") ? "a" : "div";
    }

    private get icon() {
        return this.icons.join(" ");
    }

    private get target() {
        let target = null;
        const newTab = this.$_.isPlainObject(this.link) ? (this.link as Link).newTab : false;

        if (newTab) {
            target = "_blank";
        }

        return target;
    }

    private get hasLink() {
        return !!this.link;
    }

    private get nextLevel() {
        return (this.level || 0 + 0.5);
    }

    private get hasChildNode() {
        return (this.childNodes && this.childNodes.length > 0);
    }

    private navigateTo() {
        if (this.tag === "div" && this.$route.fullPath !== this.url) {
            this.$router.push(this.url as string);
        }
    }

}

export default NavigationItem;
