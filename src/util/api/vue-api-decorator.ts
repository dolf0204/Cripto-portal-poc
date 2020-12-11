import { createDecorator } from "@/biss-core-wrapper";
import { ComponentOptions } from "vue";
import { API_TOKEN_ERROR } from "./common-api";
import { Dictionary } from "./types";

const generateDecorator = (apiToken: string, apiDictionary: Dictionary) => {

    if (!apiDictionary[apiToken]) {
        throw API_TOKEN_ERROR;
    }

    return createDecorator((compOpts: ComponentOptions<Vue>, key: string) => {
        const componentOptions = compOpts;

        if (!componentOptions.methods) {
            componentOptions.methods = {};
        }

        componentOptions.methods[key] = apiDictionary[apiToken];
    });
};

export default generateDecorator;
