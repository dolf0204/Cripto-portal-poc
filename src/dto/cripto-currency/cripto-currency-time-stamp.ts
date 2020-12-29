import { Expose } from "biss-core";
import Dto from "../dto";

class CriptoCurrencyTimeStamp extends Dto {

    @Expose({ defaultValue: null, name: "time" })
    public time: number | null = null;

    @Expose({ defaultValue: null, name: "open" })
    public open: number | null = null;

}

export default CriptoCurrencyTimeStamp;
