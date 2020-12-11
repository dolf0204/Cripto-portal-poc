import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import AppState from "./app-state";
import authenticationModule from "./authentication/authentication-module";
import authorizationModule from "./authorization/authorization-module";

Vue.use(Vuex);

const appState: StoreOptions<AppState> = {
    state: {},
    modules: {
        authenticationModule,
        authorizationModule,
    },
};

const store = new Vuex.Store(appState);

if (appState.modules) {
    Object.keys(appState.modules).forEach(
        (moduleName) => {
            const { actions } = appState.modules
                ? appState.modules[moduleName] : null as unknown as Record<string, void>;
            if (actions && actions.initialize) {
                store.dispatch(
                    `${moduleName}/initialize`,
                );
            }
        },
    );
}

export default store;

