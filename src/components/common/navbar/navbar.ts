import { Component, Vue, Prop } from "@/biss-core-wrapper";
import WithRender from "./navbar.html";
import "./navbar.scss";

@WithRender
@Component
class Navbar extends Vue {

    @Prop({ default: false, type: Boolean })
    private readonly transparent!: boolean

}

export default Navbar;
