import { decode } from "jsonwebtoken";
import { transformer } from "@/biss-core-wrapper";
import TokenData from "@/dto/authentication/token-data";

class Cookie {

    constructor(tokenKey: string, tokenValue: string, isJWT?: boolean) {
        this.tokenKey = tokenKey;
        this.tokenValue = tokenValue;

        if (isJWT) {
            this.jwtData = transformer.plainToClass(
                TokenData,
                decode(tokenValue) as Record<string, string>,
            );
        }
    }

    public tokenKey: string;

    public tokenValue: string;

    public jwtData: TokenData | null = null;

}

export default Cookie;
