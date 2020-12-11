import { Module } from "vuex";
import AppState from "../app-state";

// TODO permissions and/ or roles per project

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthorizationState {}

const authorizationState: AuthorizationState = {};

const authorizationModule: Module<AuthorizationState, AppState> = {
    namespaced: true,
    state: authorizationState,
    getters: {
    },
    mutations: {
    },
    actions: {
    },
};

export default authorizationModule;
export {
    AuthorizationState,
};
