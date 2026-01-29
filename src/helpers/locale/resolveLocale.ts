import type { Locale } from "./constants";
import { DEFAULT_LOCALE } from "./constants";
import { ensureLocale, normalizeLocale } from "./normalizeLocale";
import { pickLocaleFromAcceptLanguage } from "./acceptLanguage";

export type ResolveLocaleInput = {
    queryLang?: string | null;
    cookieLang?: string | null;
    acceptLanguageHeader?: string | null;
};

export type ResolveLocaleResult = {
    locale: Locale;
    source: "query" | "cookie" | "header" | "default";
};

export function resolveVisitorLocale(input: ResolveLocaleInput): ResolveLocaleResult {
    const query = normalizeLocale(input.queryLang);
    if (query) {
        return { locale: query, source: "query" };
    }

    const cookie = normalizeLocale(input.cookieLang);
    if (cookie) {
        return { locale: cookie, source: "cookie" };
    }

    if (input.acceptLanguageHeader) {
        const header = pickLocaleFromAcceptLanguage(input.acceptLanguageHeader);
        if (header !== DEFAULT_LOCALE) {
            return { locale: header, source: "header" };
        }

        // header may still resolve to default; we keep source explicit
        return { locale: header, source: "header" };
    }

    return { locale: ensureLocale(null), source: "default" };
}
