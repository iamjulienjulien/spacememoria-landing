import type { Locale } from "./constants";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./constants";
import { normalizeLocale } from "./normalizeLocale";

type AcceptLanguageChoice = { tag: string; q: number };

function parseAcceptLanguage(headerValue: string): AcceptLanguageChoice[] {
    return headerValue
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [tagRaw, ...params] = part.split(";").map((x) => x.trim());
            const qParam = params.find((x) => x.startsWith("q="));
            const q = qParam ? Number(qParam.replace("q=", "")) : 1;

            return {
                tag: tagRaw,
                q: Number.isFinite(q) ? q : 1,
            };
        })
        .sort((a, b) => b.q - a.q);
}

export function pickLocaleFromAcceptLanguage(headerValue: string | null | undefined): Locale {
    if (!headerValue) return DEFAULT_LOCALE;

    const choices = parseAcceptLanguage(headerValue);

    for (const choice of choices) {
        const normalized = normalizeLocale(choice.tag);
        if (normalized && (SUPPORTED_LOCALES as readonly string[]).includes(normalized)) {
            return normalized;
        }
    }

    return DEFAULT_LOCALE;
}
