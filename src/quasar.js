import Vue from "vue";
import "./styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import "@quasar/extras/roboto-font/roboto-font.css";
import iconSet from "quasar/icon-set/fontawesome-v5";

import {
    Quasar,
    QLayout,
    QHeader,
    QTooltip,
    QToolbar,
    QBtn,
    QToolbarTitle,
    QDrawer,
    QList,
    QItem,
    QMenu,
    QAvatar,
    QExpansionItem,
    QItemLabel,
    QItemSection,
    QPageContainer,
    QPage,
    QForm,
    QInput,
    QCheckbox,
    QIcon,
    QCard,
    QCardSection,
    QCardActions,
    QSeparator,
    LoadingBar,
    QBreadcrumbs,
    QBreadcrumbsEl,
    QTable,
    QField,
    QToggle,
    QPopupProxy,
    QDate,
    QTime,
    Notify,
    QSelect,
    QFab,
    Loading,
    QFabAction,
    QPageSticky,
    QTd,
    QTr,
    QTh,
    QDialog,
    Dialog,
    QSkeleton,
    QMarkupTable,
    QLinearProgress,
} from "quasar";

Vue.use(Quasar, {
    iconSet,
    config: {
        loadingBar: {
            color: "primary",
            size: "0.2rem",
        },
    },
    components: {
        QLayout,
        QHeader,
        QTooltip,
        QToolbar,
        QBtn,
        QMenu,
        QAvatar,
        QToolbarTitle,
        QDrawer,
        QList,
        QItem,
        QExpansionItem,
        QItemLabel,
        QItemSection,
        QPageContainer,
        QPage,
        QForm,
        QInput,
        QCheckbox,
        QIcon,
        QCard,
        QCardSection,
        QCardActions,
        QSeparator,
        QBreadcrumbs,
        QBreadcrumbsEl,
        QTable,
        QField,
        QToggle,
        QPopupProxy,
        QDate,
        QTime,
        QSelect,
        QFab,
        QFabAction,
        QPageSticky,
        QTd,
        QTr,
        Loading,
        QTh,
        QDialog,
        QSkeleton,
        QMarkupTable,
        QLinearProgress,
    },
    directives: { /* not needed if importStrategy is not "manual" */ },
    plugins: {
        LoadingBar,
        Notify,
        Dialog,
        Loading,
    },
});
