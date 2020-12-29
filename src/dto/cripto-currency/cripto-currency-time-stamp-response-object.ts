import { Transform, transformer, Type } from "@/biss-core-wrapper";
import { Expose } from "biss-core";
import Dto from "../dto";
import CriptoCurrencyTimeStamp from "./cripto-currency-time-stamp";

class CriptoCurrencyTimeStampResponseObject extends Dto {

    @Expose({ defaultValue: null })
    @Transform((value, object) => {
        const criptoCurrencyList = Object.keys(object).map((key) => object[key]);
        return transformer.plainToClass(CriptoCurrencyTimeStamp, criptoCurrencyList);

    })
    // public criptoCurrency: CriptoCurrencyTimeStamp[] = [];
    public criptoCurrency: CriptoCurrencyTimeStamp = new CriptoCurrencyTimeStamp();

}

export default CriptoCurrencyTimeStampResponseObject;
