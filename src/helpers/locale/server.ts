import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE_NAME, DEFAULT_LOCALE, type Locale } from "./constants";
import { normalizeLocale } from "./normalizeLocale";
import { pickLocaleFromAcceptLanguage } from "./acceptLanguage";

export async function getRequestLocale(): Promise<Locale> {
    const c = await cookies();
    const cookieLang = c.get(LOCALE_COOKIE_NAME)?.value ?? null;

    const cookieLocale = normalizeLocale(cookieLang);
    if (cookieLocale) {
        return cookieLocale;
    }

    const h = await headers();
    const acceptLanguage = h.get("accept-language");
    return acceptLanguage ? pickLocaleFromAcceptLanguage(acceptLanguage) : DEFAULT_LOCALE;
}
