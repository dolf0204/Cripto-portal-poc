import { Expose } from "biss-core";
import Dto from "../dto";

class CriptoCurrency extends Dto {

    @Expose({ defaultValue: null })
    public id: number | null = null;

    @Expose({ defaultValue: null })
    public symbol: string | null = null;

}

export default CriptoCurrency;
