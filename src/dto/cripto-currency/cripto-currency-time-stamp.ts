import { Expose } from "biss-core";
import Dto from "../dto";

class CriptoCurrencyTimeStamp extends Dto {

    @Expose({ defaultValue: null })
    public time: number | null = null;

    @Expose({ defaultValue: null })
    public open: number | null = null;

}

export default CriptoCurrencyTimeStamp;
