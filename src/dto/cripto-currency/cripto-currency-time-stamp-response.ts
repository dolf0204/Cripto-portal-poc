import { Expose } from "biss-core";
import { Type } from "@/biss-core-wrapper";
import Dto from "../dto";
import CriptoCurrencyResponseObject from "./cripto-currency-response-object";
import CriptoCurrencyTimeStampResponseObject from "./cripto-currency-time-stamp-response-object";
import CriptoCurrencyDataResponseObject from "./cripto-currency-data-response-object";

class CriptoCurrencyTimeStampResponse extends Dto {

    // @Expose({ defaultValue: [], name: "Data" })
    // @Type(() => CriptoCurrencyTimeStampResponseObject)
    // public data:
    // CriptoCurrencyTimeStampResponseObject = new CriptoCurrencyTimeStampResponseObject();

    @Expose({ defaultValue: [], name: "Data" })
    @Type(() => CriptoCurrencyDataResponseObject)
    public responseData:
    CriptoCurrencyDataResponseObject = new CriptoCurrencyDataResponseObject();

    @Expose({ defaultValue: null })
    public Message: string | null = null;

    @Expose({ defaultValue: null })
    public Response: string | null = null;

}

export default CriptoCurrencyTimeStampResponse;
