import {
    Component,
    Vue,
    Prop,
} from "@/biss-core-wrapper";
import isMobile from "@/util/decorators/mobile/is-mobile";
import Dto from "@/dto/dto";
import WithRender from "./b-table.html";
import "./b-table.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type cbField = (row: any) => string | number | null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type cbFormat = (row: any) => any

interface QColumn {
    name: string;
    label: string;
    field: cbField | string;
    align?: string;
    sortable?: boolean;
    required?: boolean;
    format?: cbFormat | string | number;
}
interface QStyle {
    flat?: boolean;
    bordered?: boolean;
    dense?: boolean;
    mobileCards?: boolean;
}
interface Pagination {
    page: number;
    rowsPerPage: number;
    rowsNumber: number | null;
}

const startPagination: Pagination = {
    page: 1,
    rowsPerPage: 0,
    rowsNumber: 0,
};

interface onRequest {
    pagination: Pagination;
}

const defaultStyle: QStyle = {
    flat: true,
    bordered: false,
    dense: false,
    mobileCards: false,
};

@WithRender
@Component
class BTable extends Vue {

    @Prop({ required: true, type: Array })
    private readonly columns!: QColumn[];

    @Prop({ required: true, type: Function })
    private readonly fetchData!: (page?: Pagination) => Promise<Dto[]>;

    @Prop({ default: () => null, type: String })
    private readonly title!: string | null;

    @Prop({ default: () => null, type: String })
    private readonly titleIcon!: string | null;

    @Prop({ default: () => [0], type: Array })
    private readonly rowsPerPageList!: number[];

    @Prop({ default: () => defaultStyle, type: Object })
    private readonly tableStyleProps!: QStyle;

    @Prop({ default: () => null, type: Object })
    private readonly pagination!: Pagination | null;

    private columnsDefinition: QColumn[] = this.columns;

    private loading: boolean = true;

    private data: Dto[] = [];

    private get showHeader() {
        return this.title || this.titleIcon;
    }

    @isMobile
    private isMobile!: boolean

    private get showAsCards() {
        return (this.tableStyle.mobileCards && this.isMobile);
    }

    private get hidePagination() {
        return (
            this.pagination !== null
            && this.pagination.page === startPagination.page
            && this.pagination.rowsPerPage === startPagination.rowsPerPage
        );
    }

    private get tableStyle() {
        return Object.assign(defaultStyle, this.tableStyleProps);
    }

    private get hasSlotRowEnd() {
        return !!(this.$slots["row-end"] || this.$scopedSlots["row-end"]);
    }

    private get hideBottom() {
        return this.hidePagination && this.data.length > 0 && this.loading === false;
    }

    private get paginationObject(): Pagination {
        let paginationObj;
        if (this.pagination) {
            paginationObj = this.$_.cloneDeep(this.pagination);

            // quasar table starts with 1
            paginationObj.page += 1;
        }

        return paginationObj as Pagination;
    }

    private set paginationObject(pagination: Pagination) {
        const nextPagination = this.$_.cloneDeep(pagination);
        nextPagination.page -= 1;
        this.$emit("pageChange", nextPagination);
    }

    private created() {
        this.columnsDefinition = this.columnsDefinition.map((columnDef: QColumn) => {
            const columnDefinition = columnDef;
            if (this.$_.isString(columnDefinition.field) && columnDefinition.field.includes(".")) {
                const path = columnDefinition.field as string;
                columnDefinition.field = (row: QColumn) => this.$_.get(row, path);
            }
            return columnDefinition;
        });

        this.$async(async () => {
            await this.fetch();
        });
    }

    private async fetch(props?: onRequest) {
        if (props && this.pagination) {
            const { page, rowsPerPage } = props.pagination;
            const nextPage = {
                page: page - 1, // page for backend start with 0
                rowsPerPage,
                rowsNumber: this.pagination.rowsNumber,
            };
            this.data = await this.fetchData(nextPage);
            this.$forceUpdate();
        } else {
            this.data = await this.fetchData();
        }

        this.loading = false;
    }

}

export default BTable;

export {
    QColumn,
    cbFormat,
    cbField,
    QStyle,
    Pagination,
};
