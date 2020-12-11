import { transformer } from "@/biss-core-wrapper";
import { decode } from "jsonwebtoken";
import i18n from "@/i18n";
import Dto from "@/dto/dto";
import TokenData from "@/dto/authentication/token-data";
import {
    Constructor,
    CallPromise,
    ResponseObject,
    HTTP_HEADER_METHOD,
} from "./types";
import { applyHeaders, getData } from "./common-api";

enum ERROR_TEXT {
    SERVER_ERROR = "Server error",
    BAD_REQUEST = "Bad request",
    INVALID_CREDENTIALS = "invalid credentials",
}

const Bearer = "Bearer";

type RecordData = Record<string, string | number | boolean | null | undefined>

const transformWrapper = (
    value: RecordData | RecordData[],
    cstr?: Constructor<Dto>,
): Dto | RecordData | RecordData[] => {
    if (cstr) {
        return transformer.plainToClass(cstr, value);
    }

    return value as RecordData;
};

const handleErrors = async (response: Response) => {
    let error = null;

    if (response.status === 401) {
        error = new Error(ERROR_TEXT.INVALID_CREDENTIALS);
    }

    if (response.status >= 500) {
        error = new Error(ERROR_TEXT.SERVER_ERROR);
    }

    if (response.status === 400 || (response.status > 401 && response.status < 500)) {
        const value = await response.text();
        let message = null;

        if (value) {
            const json = JSON.parse(value);
            if (json.message) {
                message = i18n.t(json.message) as string;
            }
        }

        error = new Error(message || ERROR_TEXT.BAD_REQUEST);
    }

    if (error) {
        // eslint-disable-next-line no-throw-literal
        throw { error, response };
    }

    return response;

};

const getJWTToken = (response: Response): string => {
    let token = null;
    let error = null;

    handleErrors(response);

    // eslint-disable-next-line array-callback-return
    Array.from(response.headers.entries(), (pair: string[]) => {
        if (pair[0] === "authorization") {
            // eslint-disable-next-line prefer-destructuring
            token = pair[1].replace(Bearer, "").trim();
        }
    });

    if (!token) {
        error = new Error("token not found");
        // eslint-disable-next-line no-throw-literal
        throw { error, response };
    }

    return token;
};

const APICall = {
    login: async (
        url: string,
        data: Dto,
        cls?: Constructor<Dto>,
        extraHeaders?: Record<string, string>,
    ): CallPromise<TokenData> => {
        const httpHeaders = applyHeaders(extraHeaders);
        const plainData = transformer.classToPlain(data as Constructor<Dto>);

        return fetch(url, {
            headers: httpHeaders,
            method: HTTP_HEADER_METHOD.POST,
            body: plainData ? JSON.stringify(plainData) : null,
        })
            .then(getJWTToken)
            .then((token: string) => {
                const tokenDataPlain = decode(token) as RecordData;
                const tokenData = transformWrapper(tokenDataPlain, TokenData) as TokenData;
                tokenData.token = token;
                return tokenData;
            });
    },

    get: async (
        url: string,
        cls?: Constructor<Dto>,
        extraHeaders?: Record<string, string>,
    ): CallPromise<Dto | RecordData | RecordData[]> => {

        const httpHeaders = applyHeaders(extraHeaders);

        return fetch(url, {
            headers: httpHeaders,
        })
            .then(handleErrors)
            .then((value: Response) => value && value.text())
            .then((value: string) => value && JSON.parse(value))
            .then((value: ResponseObject) => getData(value))
            .then((value: RecordData | RecordData[]) => transformWrapper(value, cls));
    },

    post: async (
        url: string,
        data: Dto,
        cls?: Constructor<Dto>,
        extraHeaders?: Record<string, string>,
    ): CallPromise<Dto | RecordData | RecordData[]> => {

        const plainData = transformer.classToPlain(data as Constructor<Dto>);
        const httpHeaders = applyHeaders(extraHeaders);

        return fetch(url, {
            headers: httpHeaders,
            method: HTTP_HEADER_METHOD.POST,
            body: plainData ? JSON.stringify(plainData) : null,
        })
            .then(handleErrors)
            .then((value: Response) => value && value.text())
            .then((value: string) => value && JSON.parse(value))
            .then((value: RecordData | RecordData[]) => transformWrapper(value, cls));
    },

    put: async (
        url: string,
        data: Dto,
        cls?: Constructor<Dto>,
        extraHeaders?: Record<string, string>,
    ): CallPromise<Dto | RecordData | RecordData[]> => {
        const plainData = transformer.classToPlain(data as Constructor<Dto>);
        const httpHeaders = applyHeaders(extraHeaders);

        return fetch(url, {
            headers: httpHeaders,
            method: HTTP_HEADER_METHOD.PUT,
            body: JSON.stringify(plainData),
        })
            .then(handleErrors)
            .then((value: Response) => value && value.text())
            .then((value: string) => value && JSON.parse(value))
            .then((value: ResponseObject) => getData(value))
            .then((value: RecordData | RecordData[]) => transformWrapper(value, cls));
    },

    delete: async (
        url: string,
        data: Dto,
        cls?: Constructor<Dto>,
        extraHeaders?: Record<string, string>,
    ): Promise<Dto | RecordData | RecordData[]> => {
        const plainData = transformer.classToPlain(data as Constructor<Dto>);
        const httpHeaders = applyHeaders(extraHeaders);

        return fetch(url, {
            headers: httpHeaders,
            method: HTTP_HEADER_METHOD.DELETE,
            body: JSON.stringify(plainData),
        })
            .then(handleErrors)
            .then((value: Response) => value && value.text())
            .then((value: string) => value && JSON.parse(value))
            .then((value: ResponseObject) => getData(value))
            .then((value: RecordData | RecordData[]) => transformWrapper(value, cls));
    },
};

export default APICall;
