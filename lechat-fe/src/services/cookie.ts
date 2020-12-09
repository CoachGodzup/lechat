const DEFAULT_COOKIE_EXPIRATION_DATE = 1 * 24 * 60 * 60 * 1000;

export interface Cookie {
  name: string;
  value: any;
  expirationDate?: Date;
  path?: string;
}

const DEFAULT_COOKIE: Cookie = {
  name: '',
  value: '',
  expirationDate: new Date(new Date().getTime() + DEFAULT_COOKIE_EXPIRATION_DATE),
  path: '/'
}

class CookieService {
  setCookie(newCookie: Cookie): void {
    debugger;
    const newCookieWithDefault = { ...DEFAULT_COOKIE, ...newCookie };
    localStorage.setItem(newCookieWithDefault.name, newCookieWithDefault.value)
  }

  getCookieByName(name: string): string|null {
    return localStorage.getItem(name)
  }

  deleteCookie(name: string): void {
    localStorage.removeItem(name)
  }
}

const cookieService = new CookieService();
export default cookieService;
