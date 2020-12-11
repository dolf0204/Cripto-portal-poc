import Cookie from "./cookie";

class CookieFactory {

    public static setCookie(token: string, tokenValue: string, expires?: Date): CookieFactory {
        if (tokenValue && expires) {
            document.cookie = `${token}=${tokenValue}; path=/; expires=${expires.toUTCString()};`;
        } else {
            document.cookie = `${token}=${tokenValue}; path=/;`;
        }

        return CookieFactory;
    }

    public static removeToken(tokenKey: string): CookieFactory {
        document.cookie = `${tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

        return CookieFactory;
    }

    public static getCookie(tokenKey: string, isJWT?: boolean): Cookie | null {
        const match = document.cookie.match(new RegExp(`(^| )${tokenKey}=([^;]+)`));

        let cookie = null;

        if (match && match[2]) {
            cookie = new Cookie(tokenKey, match[2], isJWT);
        }

        return cookie;
    }

    // eslint-disable-next-line class-methods-use-this
    public static getInstance(): CookieFactory {

        CookieFactory.instance = new CookieFactory();

        return CookieFactory.instance;
    }

    private static instance: CookieFactory;

}

export default CookieFactory;
