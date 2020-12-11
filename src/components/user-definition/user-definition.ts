import { Component, Vue } from "@/biss-core-wrapper";
import ExpensionItem from "@/components/common/expension-item/expension-item";
import WithRender from "./user-definition.html";

@WithRender
@Component({
    components: {
        ExpensionItem,
    },
})
class UserDefinition extends Vue {
}

export default UserDefinition;
