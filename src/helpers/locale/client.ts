import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE_NAME, DEFAULT_LOCALE, type Locale } from "./constants";
import { normalizeLocale } from "./normalizeLocale";
import { pickLocaleFromAcceptLanguage } from "./acceptLanguage";

export type ClientLocaleSource = "query" | "cookie" | "header" | "default";

export type GetClientLocaleParams = {
    searchParams?: Record<string, string | string[] | undefined>;
};

/**
 * Locale resolution with URL awareness.
 *
 * Priority:
 * 1) ?lang=XX (searchParams)
 * 2) Cookie
 * 3) Accept-Language header
 * 4) Fallback (en)
 */
export async function getClientLocale({ searchParams }: GetClientLocaleParams = {}): Promise<{
    locale: Locale;
    source: ClientLocaleSource;
}> {
    // 1) URL (?lang=XX)
    const langParamRaw = searchParams?.lang;
    const langParam = Array.isArray(langParamRaw) ? langParamRaw[0] : langParamRaw;
    const urlLocale = normalizeLocale(langParam);

    if (urlLocale) {
        return { locale: urlLocale, source: "query" };
    }

    // 2) Cookie
    const c = await cookies();
    const cookieLang = c.get(LOCALE_COOKIE_NAME)?.value ?? null;
    const cookieLocale = normalizeLocale(cookieLang);

    if (cookieLocale) {
        return { locale: cookieLocale, source: "cookie" };
    }

    // 3) Accept-Language
    const h = await headers();
    const acceptLanguage = h.get("accept-language");

    if (acceptLanguage) {
        return {
            locale: pickLocaleFromAcceptLanguage(acceptLanguage),
            source: "header",
        };
    }

    // 4) Fallback
    return { locale: DEFAULT_LOCALE, source: "default" };
}
