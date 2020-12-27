import APICall from "@/util/api/api";
import { Dictionary } from "@/util/api/types";
import generateDecorator from "@/util/api/vue-api-decorator";
import CriptoCurrency from "./cripto-currency";
import CriptoCurrencyResponse from "./cripto-currency-response";
import CriptoCurrencyTimeStampResponse from "./cripto-currency-time-stamp-response";

const criptCurrencyDictionary: Dictionary = {
    getCriptoCurrencies: async (): Promise<CriptoCurrency[]> => APICall.get("/api/cryptocurrency/listings/latest?start=1&limit=10&convert=USD", CriptoCurrency) as unknown as CriptoCurrency[],
    getCriptoCompareCriptoCurrencies: async (): Promise<CriptoCurrencyResponse> => APICall.get("/api/data/blockchain/list", CriptoCurrencyResponse) as unknown as CriptoCurrencyResponse,
    getCriptoCompareCriptoCurrenciesTimeStamps: async (): Promise<CriptoCurrencyTimeStampResponse> => APICall.get("api/data/v2/histoday?fsym=BTC&tsym=USD&limit=10", CriptoCurrencyTimeStampResponse) as unknown as CriptoCurrencyTimeStampResponse,

};

const criptoApi = (apiToken: string) => generateDecorator(apiToken, criptCurrencyDictionary);

export default criptoApi;
export {
    criptCurrencyDictionary,
};
