import { decode } from "jsonwebtoken";
import { Module, ActionContext } from "vuex";
import { LoginCookie } from "@/util";
import AppState from "../app-state";

interface AuthenticationState {
    token: string | null;
    tokenData: Record<string, string> | null;
}

const authenticationState: AuthenticationState = {
    token: null,
    tokenData: null,
};

const authenticationModule: Module<AuthenticationState, AppState> = {
    namespaced: true,
    state: authenticationState,
    getters: {
        token: (state: AuthenticationState) => state.token,
        tokenData: (state: AuthenticationState) => state.tokenData,
    },
    mutations: {
        _setToken: (state: AuthenticationState, token: string) => {
            state.token = token;
            state.tokenData = decode(token) as Record<string, string>;
            LoginCookie.setLoginCookie(token);
        },
        _clear: (state: AuthenticationState) => {
            state.token = null;
            state.tokenData = null;
            LoginCookie.clearLoginCookie();
        },
    },
    actions: {
        initialize: (context: ActionContext<AuthenticationState, AppState>) => {
            const loginCookie = LoginCookie.cookie;
            if (loginCookie) {
                context.commit("_setToken", loginCookie);
            }
        },
        setToken: (context: ActionContext<AuthenticationState, AppState>, token: string) => {
            context.commit("_setToken", token);
        },
        clear: (context: ActionContext<AuthenticationState, AppState>) => {
            context.commit("_clear");
        },
    },
};

export default authenticationModule;
export {
    AuthenticationState,
};
