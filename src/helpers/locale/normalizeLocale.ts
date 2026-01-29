import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./constants";

export function normalizeLocale(input: string | null | undefined): Locale | null {
    if (!input) return null;

    const v = input.trim().toLowerCase();

    // "fr-FR" -> "fr"
    const primary = v.split("-")[0];

    if ((SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
        return primary as Locale;
    }

    return null;
}

export function ensureLocale(input: string | null | undefined): Locale {
    return normalizeLocale(input) ?? DEFAULT_LOCALE;
}
