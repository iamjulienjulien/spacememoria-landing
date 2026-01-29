import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE_NAME, resolveVisitorLocale, normalizeLocale } from "@/helpers/locale";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const queryLang = url.searchParams.get("lang");
    const cookieLang = req.cookies.get(LOCALE_COOKIE_NAME)?.value ?? null;
    const acceptLanguage = req.headers.get("accept-language");

    const resolved = resolveVisitorLocale({
        queryLang,
        cookieLang,
        acceptLanguageHeader: acceptLanguage,
    });

    const res = NextResponse.next();

    const cookieIsValid = !!normalizeLocale(cookieLang);
    const queryIsValid = !!normalizeLocale(queryLang);

    // Persist cookie when:
    // - queryLang is present (explicit choice)
    // - cookie missing/invalid
    if (queryIsValid || !cookieIsValid) {
        res.cookies.set(LOCALE_COOKIE_NAME, resolved.locale, {
            path: "/",
            httpOnly: false,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
    }

    return res;
}

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};
