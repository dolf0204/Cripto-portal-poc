type Constructor<A> = new() => A

type CallPromise<K> = Promise<K | string | number | boolean | undefined>

type TypeDictionary1 = <T, K>(...args: T[]) => CallPromise<K>

type TypeDictionary2 = <K>(...args: number[]) => CallPromise<K>

interface Dictionary {
    [key: string]: TypeDictionary1 | TypeDictionary2;
}

interface Errors {
    message: string;
}

interface ResponseObject {
    data: Record<string, string | number | boolean | null | undefined> | [];
    error: string;
    errors: Errors[];
}

enum HTTP_HEADER_METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

enum GRAPHQL_METHODS {
    QUERY,
    MUTATION,
}

export {
    Constructor,
    CallPromise,
    Dictionary,
    ResponseObject,
    HTTP_HEADER_METHOD,
    GRAPHQL_METHODS,
};
