import { LoginCookie } from "@/util";
import { transformer } from "@/biss-core-wrapper";
import Dto from "@/dto/dto";
import { Constructor, ResponseObject } from "./types";

const API_TOKEN_ERROR = new Error("invalid API token");

interface ApiError extends Error {
    error?: Error;
    response?: Response;
}

type PlainObject = Record<string, string | number | boolean | null | undefined>

const getData = (response: ResponseObject) : PlainObject | PlainObject[] => {
    if (response.error || (response.errors && response.errors.length)) {
        const error = new Error(response.errors[0].message);
        // eslint-disable-next-line no-throw-literal
        throw { error, response };
    }
    return response.data;
};

const applyHeaders = (extraHeaders?: Record<string, string>): Record<string, string> => {
    const { cookie } = LoginCookie;
    let httpHeaders: {[key: string]: string } = {
        "Content-Type": "application/json",
    };

    if (cookie && cookie.tokenValue) {
        httpHeaders.Authorization = `Bearer ${cookie.tokenValue}`;
    }

    if (extraHeaders) {
        httpHeaders = { ...httpHeaders, ...extraHeaders };
    }

    return httpHeaders;
};

const transformWrapper = (
    value: PlainObject | PlainObject[],
    cstr?: Constructor<Dto>,
): Dto | Record<string, string | number | boolean | null> => {
    if (cstr) {
        return transformer.plainToClass(cstr, value);
    }

    return value;
};

export {
    API_TOKEN_ERROR,
    getData,
    applyHeaders,
    transformWrapper,
    ApiError,
};
