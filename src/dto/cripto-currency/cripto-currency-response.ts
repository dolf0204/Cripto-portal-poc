import { Expose } from "biss-core";
import { Type } from "@/biss-core-wrapper";
import Dto from "../dto";
import CriptoCurrencyResponseObject from "./cripto-currency-response-object";

class CriptoCurrencyResponse extends Dto {

    @Expose({ defaultValue: [], name: "Data" })
    @Type(() => CriptoCurrencyResponseObject)
    public data: CriptoCurrencyResponseObject[] = [];

    @Expose({ defaultValue: null })
    public Message: string | null = null;

    @Expose({ defaultValue: null })
    public Response: string | null = null;

}

export default CriptoCurrencyResponse;
