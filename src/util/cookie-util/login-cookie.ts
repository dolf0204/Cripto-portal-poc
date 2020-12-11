import { moment } from "@/biss-core-wrapper";
import TokenData from "@/dto/authentication/token-data";
import CookieFactory from "./cookie-factory";
import Cookie from "./cookie";

class LoginCookie {

    public static getInstance(tokenValue?: string): LoginCookie {

        LoginCookie.instance = new LoginCookie();

        if (tokenValue) {
            CookieFactory.setCookie(this.tokenKey, tokenValue);
        }

        CookieFactory.getCookie(this.tokenKey, true);

        return LoginCookie.instance;
    }

    public static setLoginCookie(tokenValue: string, expires?: Date): CookieFactory {
        let exp = expires;
        if (!exp) {
            exp = moment().add(1, "h").toDate();
        }
        if (tokenValue) {
            CookieFactory.setCookie(this.tokenKey, tokenValue, exp);
        }

        const cookie = CookieFactory.getCookie(this.tokenKey, true);

        if (!cookie) {
            throw new Error("loginCookie not set");
        }

        return CookieFactory;
    }

    public static clearLoginCookie(): CookieFactory {
        CookieFactory.removeToken(this.tokenKey);

        return CookieFactory;
    }

    public static get cookie(): Cookie | null {
        return CookieFactory.getCookie(this.tokenKey, true);
    }

    public static get jwtData(): TokenData | null {
        return this.cookie && this.cookie.jwtData;
    }

    public static get hash(): string | null {
        return this.cookie && this.cookie.tokenValue;
    }

    private static tokenKey: string = "key";

    private static instance: LoginCookie;

}

export default LoginCookie;
