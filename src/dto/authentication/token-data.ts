import { Expose } from "biss-core";
import Dto from "@/dto/dto";

class TokenData extends Dto {

    @Expose({ defaultValue: [] })
    public authorities: string[] = [];

    @Expose({ defaultValue: null })
    public exp: number | null = null;

    @Expose({ defaultValue: null })
    public iat: number | null = null;

    @Expose({ defaultValue: null })
    public jti: string | null = null;

    @Expose({ defaultValue: null })
    public sub: string | null = null;

    @Expose({ defaultValue: null })
    public token: string | null = null;

    @Expose({ defaultValue: null })
    public firstName: string | null = null;

    @Expose({ defaultValue: null })
    public lastName: string | null = null;

    @Expose({ defaultValue: null })
    public email: string | null = null;

    @Expose({ defaultValue: null })
    public avatar: string | null = null;

    public get fullName() {
        return this.firstName ? `${this.firstName} ${this.lastName}` : "";
    }

}

export default TokenData;
