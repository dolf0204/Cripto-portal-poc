import { Component, Vue } from "@/biss-core-wrapper";
import { LoginCookie } from "@/util";
import { ApiError } from "@/util/api/common-api";
import WithRender from "./app.html";

const { VUE_APP_LOG_ERROR: logError, NODE_ENV } = process.env;

@WithRender
@Component
class App extends Vue {

    private globalErrorHandler(apiError: ApiError) {
        if (this.$route.path !== "/login" && apiError.response && apiError.response.status === 401) {
            LoginCookie.clearLoginCookie();
            this.$router.push("/login");
        } else if (apiError.response && apiError.response.status === 404) {
            this.$q.notify({
                color: "negative",
                message: this.$t("general.error-server-unavailable-message") as string,
            });

        } else if (apiError.response || NODE_ENV !== "production") {
            this.$q.notify({
                color: "negative",
                message: apiError.error ? apiError.error.message
                    : (apiError as unknown as Error).message,
            });
        } else {
            this.$q.notify({
                color: "negative",
                message: this.$t("general.error-message") as string,
            });
        }

        if (this.$_.toNumber(logError) === 1) {
            throw apiError.error || apiError;
        }
    }

    private created() {

        if (!LoginCookie.cookie) {
            this.$router.push("/login");
        }

        // prevent root slash
        if (this.$route.path === "/") {
            this.$router.push("/home");
        }

        this.$registerErrorEventBus(this.globalErrorHandler);
    }

}

export default App;
