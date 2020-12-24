import { Transform, transformer, Type } from "@/biss-core-wrapper";
import CriptoCurrency from "@/dto/cripto-currency/cripto-currency";
import { Expose } from "biss-core";
import Dto from "../dto";

class CriptoCurrencyResponseObject extends Dto {

    @Expose({ defaultValue: null })
    @Transform((value, object) => {
        const criptoCurrencyList = Object.keys(object).map((key) => object[key]);
        return transformer.plainToClass(CriptoCurrency, criptoCurrencyList);

    })
    public criptoCurrency: CriptoCurrency[] = [];

}

export default CriptoCurrencyResponseObject;
