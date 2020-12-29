import { Expose } from "biss-core";
import { Type } from "@/biss-core-wrapper";
import Dto from "../dto";
import CriptoCurrencyResponseObject from "./cripto-currency-response-object";
import CriptoCurrencyTimeStampResponseObject from "./cripto-currency-time-stamp-response-object";
import CriptoCurrencyTimeStamp from "./cripto-currency-time-stamp";

class CriptoCurrencyDataResponseObject extends Dto {

    // @Expose({ defaultValue: [], name: "Data" })
    // @Type(() => CriptoCurrencyTimeStampResponseObject)
    // public data:
    // CriptoCurrencyTimeStampResponseObject[] = [];

    @Expose({ defaultValue: [], name: "Data" })
    @Type(() => CriptoCurrencyTimeStamp)
    public data: CriptoCurrencyTimeStamp[] = [];

    @Expose({ defaultValue: null, name: "TimeFrom" })
    public timeFrom: number | null = null;

    @Expose({ defaultValue: null, name: "TimeTo" })
    public timeTo: number | null = null;

    @Expose({ defaultValue: null, name: "Aggregated" })
    public aggregated: boolean | null = null;

}

export default CriptoCurrencyDataResponseObject;
