import APICall from "@/util/api/api";
import { Dictionary } from "@/util/api/types";
import generateDecorator from "@/util/api/vue-api-decorator";

const authenticationDictionary: Dictionary = {
    login: async <Login, TokenData>(login: Login): Promise<TokenData> => APICall.login("api/login", login) as unknown as TokenData,
    logout: async (): Promise<string> => APICall.get("api/logout") as unknown as string,
};

const authenticationApi = (apiToken: string) => generateDecorator(
    apiToken, authenticationDictionary,
);

export default authenticationApi;
export {
    authenticationDictionary,
};
